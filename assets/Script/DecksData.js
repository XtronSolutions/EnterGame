var GamePlayReferenceManager=null;
//-------------------------------------------Spaces Data-------------------------//
var EnumSpaceType = cc.Enum({
    None:0,
    WildCard: 1,
    BigBusiness: 2,
    Marketing: 3,
    Invest: 4,
    Losses:5,
    PayDay: 6,
    DoublePayDay: 7,
    OneQuestion: 8,
    Sell: 9,
    BuyOrSell: 10,
    GoBackSpaces:11,
});
//-------------------------------------------class for card data-------------------------//
var CardData=cc.Class({
    name:"CardData",
    properties: {
        ID:
        {
           displayName:"ID",
           type: cc.Text,
           default: "",
           serializable: true,
           tooltip:"Id of the card"},
        Description:
        {
           displayName:"Description",
           type: cc.Text,
           default: "",
           serializable: true,
           tooltip:"description of the card"},
        HasButton:
        {
           displayName:"HasButton",
           type: cc.boolean,
           default: false,
           serializable: true,
           tooltip:"if this card should have interaction button"},
        ButtonName:
        {
           displayName:"ButtonName",
           type: cc.Text,
           default: "",
           serializable: true,
           tooltip:"button name to show on screen"},
 },

 ctor: function () { //constructor
 }

});

//-------------------------------------------class for card UI-------------------------//
var CardUI=cc.Class({
   name:"CardUI",
   properties: {
       ToastNode:
       {
          displayName:"ToastNode",
          type: cc.Node,
          default: null,
          serializable: true,
          tooltip:"node reference for toast node"},
       ToastLabel:
       {
          displayName:"ToastLabel",
          type: cc.Label,
          default: null,
          serializable: true,
          tooltip:"label reference for toast node"},
      ButtonNode:
       {
          displayName:"ExitButton",
          type: cc.Node,
          default: null,
          serializable: true,
          tooltip:"Button reference for node"},
        InteractionButtonNode:
       {
          displayName:"InteractionButton",
          type: cc.Node,
          default: null,
          serializable: true,
          tooltip:"interaction Button reference for node"},
},

ctor: function () { //constructor
}

});
//-------------------------------------------class for decks Data-------------------------//
var DecksData=cc.Class({
    name:"DecksData",
    extends: cc.Component,
    properties: {
      MainUI:
      {
         displayName:"MainUI",
         default: null,
         type: CardUI,
         serializable: true,
         tooltip:"UI of decks"},
      BigBusiness:
      {
         displayName:"BigBusiness",
         type: [CardData],
         default: [],
         serializable: true,
         tooltip:"all cards data for big business",},
      Marketing:
      {
         displayName:"Marketing",
         type: [CardData],
         default: [],
         serializable: true,
         tooltip:"all cards data for marketing",},
       Losses:
      {
         displayName:"Losses",
         type: [CardData],
         default: [],
         serializable: true,
         tooltip:"all cards data for losses",},
       WildCards:
      {
         displayName:"WildCards",
         type: [CardData],
         default: [],
         serializable: true,
         tooltip:"all cards data for WildCards",},
        SpacesType:
        {
            type: EnumSpaceType,
            default: EnumSpaceType.None,
            serializable: true,
            tooltip:"states machines by type of card or spaces on board",}, 
    },

    onLoad()
    {
      this.CheckReferences();
      this.SelectedCardIndex=-1;
      this.CardSelected=-1;
      this.IsBotTurn=false;

      //this.BigBusinessCardFunctionality("1");
      //for testing
      // this.Counter=0;
      // this.GenerateRandomBigBusinessCard(this.Counter);
    },

    CheckReferences()
    {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            GamePlayReferenceManager=require('GamePlayReferenceManager');
    },

    getRandom:function(min,max)
    {
        return Math.floor(Math.random() * (max - min) ) + min; // min included and max excluded
    },

    ToggleButtons(_isOwner,_hasButton=false,_isBot=false)
    {
        if(_isOwner && _hasButton)
      {
         this.MainUI.ButtonNode.active=false;
         this.MainUI.InteractionButtonNode.active=true;
      }
      else  if(_isOwner && !_hasButton)
      {
        this.MainUI.ButtonNode.active=true;
        this.MainUI.InteractionButtonNode.active=false;
      }
      else
      {
        this.MainUI.InteractionButtonNode.active=false;
        this.MainUI.ButtonNode.active=false;

        if(_isBot==false)
        {
            setTimeout(() => {
            this.ExitCardInfo();
            }, 2500);
        }
      }
    },


    GenerateRandomBigBusinessCard(_isOwner,_randomValue,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.BigBusiness;
      this.SelectedCardIndex= _randomValue;
      this.CardSelected=this.BigBusiness[this.SelectedCardIndex].ID;

      if(this.BigBusiness[this.SelectedCardIndex].HasButton)
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string=this.BigBusiness[this.SelectedCardIndex].ButtonName;

      this.ShowCardInfo(this.BigBusiness[this.SelectedCardIndex].Description,true);
      this.ToggleButtons(_isOwner,this.BigBusiness[this.SelectedCardIndex].HasButton,_isBot);

      if(_isBot)
      {
          this.CardFuntionalityButton();
      }
    },

    GenerateRandomMarketingCard(_isOwner,_randomValue,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.Marketing;
      this.SelectedCardIndex= _randomValue;
      this.CardSelected=this.Marketing[this.SelectedCardIndex].ID;

      if(this.Marketing[this.SelectedCardIndex].HasButton)
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string=this.Marketing[this.SelectedCardIndex].ButtonName;
    
      this.ShowCardInfo(this.Marketing[this.SelectedCardIndex].Description,true);
      this.ToggleButtons(_isOwner,this.Marketing[this.SelectedCardIndex].HasButton,_isBot);

      if(_isBot)
      {
          this.CardFuntionalityButton();
      }
    },

    GenerateRandomLossesCard(_isOwner,_randomValue,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.Losses;
      this.SelectedCardIndex= _randomValue;
      this.CardSelected=this.Losses[this.SelectedCardIndex].ID;

      this.ShowCardInfo(this.Losses[this.SelectedCardIndex].Description,true);

      if(this.Losses[this.SelectedCardIndex].HasButton)
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string=this.Losses[this.SelectedCardIndex].ButtonName;
     
      this.ToggleButtons(_isOwner,this.Losses[this.SelectedCardIndex].HasButton,_isBot);

      if(_isBot)
      {
          this.CardFuntionalityButton();
      }
    },

    GenerateRandomWildCard(_isOwner,_randomValue,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.WildCard;
      this.SelectedCardIndex= _randomValue;
      this.CardSelected=this.WildCards[this.SelectedCardIndex].ID;

      if(this.WildCards[this.SelectedCardIndex].HasButton)
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string=this.WildCards[this.SelectedCardIndex].ButtonName;
 
      this.ShowCardInfo(this.WildCards[this.SelectedCardIndex].Description,true);
      this.ToggleButtons(_isOwner,this.WildCards[this.SelectedCardIndex].HasButton,_isBot);

      if(_isBot)
      {
          this.CardFuntionalityButton();
      }
    },

    SpaceInvest(_isOwner,_index,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.Invest;
      this.ShowCardInfo("You can invest one more time in Gold or stocks this turn.",true);
      this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string="ACCEPT";
      this.ToggleButtons(_isOwner,true,_isBot);

      if(_isBot)
      {
        this.CompleteTurnWithToast("msg",2100);
      }
    },

    SpacePayDay(_isOwner,_index)
    {
      this.ShowCardInfo("You have landed on PayDay space.",true);
      this.PayDayFunctionality();

      this.ToggleButtons(_isOwner,false);
    },

    SpaceDoublePayDay(_isOwner,_index)
    {
      this.ShowCardInfo("You have landed on DoublePayDay space.",true);
      this.DoublePayDayFunctionality();

      this.ToggleButtons(_isOwner,false);
    },

    SpaceOneQuestion(_isOwner,_index,_isBot=false)
    {
        this.IsBotTurn=_isBot;
        this.SpacesType=EnumSpaceType.OneQuestion;
        this.ShowCardInfo("You can ask one question to any other player, if player is unable to answer they will pay you some cash amount.",true);
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string="ACCEPT";
        this.ToggleButtons(_isOwner,true,_isBot);
        if(_isBot)
        {
            this.CompleteTurnWithToast("msg",2100);
        }
    },

    SpaceSell(_isOwner,_index,_isBot=false)
    {
      this.IsBotTurn=_isBot;
      this.SpacesType=EnumSpaceType.Sell;
      this.ShowCardInfo("You can sell any one of your business or can skip turn.",true);
      this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string="ACCEPT";
      this.ToggleButtons(_isOwner,true,_isBot);
      if(_isBot)
        {
            this.CompleteTurnWithToast("msg",2100);
        }
    },

    SpaceBuyOrSell(_isOwner,_index,_isBot=false)
    {
        this.IsBotTurn=_isBot;
        this.SpacesType=EnumSpaceType.BuyOrSell;
        this.ShowCardInfo("You can Buy or sell Gold or stocks one more time in this turn.",true);
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string="ACCEPT";
        this.ToggleButtons(_isOwner,true,_isBot);
        if(_isBot)
        {
            this.CompleteTurnWithToast("msg",2100);
        }
    },

    SpaceGoBackSpaces(_isOwner,_index,_isBot=false)
    {
        this.IsBotTurn=_isBot;
        this.SpacesType=EnumSpaceType.GoBackSpaces;
        this.ShowCardInfo("you will have to go back 3 spaces.",true);
        this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string="ACCEPT";
        this.ToggleButtons(_isOwner,true,_isBot);
        if(_isBot)
        {
            setTimeout(() => {
                this.CardFuntionalityButton();
            }, 1000);
            
        }
    },

    ShowCardInfo:function(message,_state)
    {
      if(_state)
      {
        this.MainUI.ToastNode.active=true;
        this.MainUI.ToastLabel.string=message;
      }else
      {
         this.MainUI.ToastLabel.string="";
         this.MainUI.ToastNode.active=false;
      }
    },

    ExitCardInfo()
    {
      this.ShowCardInfo("",false);
      GamePlayReferenceManager.Instance.Get_GameManager().ResetCardDisplay();  
      GamePlayReferenceManager.Instance.Get_GameManager().RaiseEventTurnComplete();   

      //for testing
      // this.Counter++;
      // this.GenerateRandomBigBusinessCard(this.Counter);
    },

    CardFuntionalityButton()
    {
      if(this.SpacesType==EnumSpaceType.BigBusiness)
      {
        this.BigBusinessCardFunctionality(this.CardSelected);
      }else if(this.SpacesType==EnumSpaceType.Losses)
      {
        this.LossesCardFunctionality(this.CardSelected);
      }
      else if(this.SpacesType==EnumSpaceType.Marketing)
      {
        this.MarketingCardFunctionality(this.CardSelected);
      }
      else if(this.SpacesType==EnumSpaceType.WildCard)
      {
        this.WildCardFunctionality(this.CardSelected);
      }
      else if(this.SpacesType==EnumSpaceType.Sell)
      {
        this.SellFunctionality();
      }
      else if(this.SpacesType==EnumSpaceType.Invest)
      {
        this.InvestFunctionality();
      }
      else if(this.SpacesType==EnumSpaceType.BuyOrSell)
      {
        this.BuyOrSellFunctionality();
      }
      else if(this.SpacesType==EnumSpaceType.OneQuestion)
      {
        this.OneQuestionFunctionality();
      }
      else if(this.SpacesType==EnumSpaceType.GoBackSpaces)
      {
        this.GoBackFunctionality();
      }
    },

    CheckLoan()
    {
        var _loanTaken=false;
        var _businessIndex=0;

        var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
        var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
        
        for (let index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {

            if(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken)
            {
                _loanTaken=true;
                _businessIndex=index;
                break;
            }    
        }

        var val=-1;
        val=_loanTaken==true?1:0;
        var Result=cc.v2(val, _businessIndex)
        return Result;
    },

    CompleteTurnWithToast(_msg,_time)
    {
        var _manager=GamePlayReferenceManager.Instance.Get_GameManager();

        if(this.IsBotTurn)
        {
            console.log(_msg);
            var _delay=this.getRandom(1500,2500);
            setTimeout(() => {
            this.ShowCardInfo("",false);
            _manager.ResetCardDisplay();  
            _manager.RaiseEventTurnComplete();   
            }, (_delay));
        }
        else
        {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg,_time);
            this.ShowCardInfo("",false);

            setTimeout(() => {
            this.ShowCardInfo("",false);
            _manager.ResetCardDisplay();  
            _manager.RaiseEventTurnComplete();   
            }, (_time+100));
        }
    },

    BigBusinessCardFunctionality(_id)
    {
      var Index=parseInt(_id);
      Index=Index-1;

       switch (_id) {
         case "1"://receive 20000$ gift to payoff loan
             console.log(this.BigBusiness[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             var _result=this.CheckLoan();
             var IsLoanTaken=_result.x;
             var _businessIndex=_result.y;

             if(IsLoanTaken==1) //means user has taken loan
             {
                _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount=_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount-20000;
                if(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount<=0)
                {
                    _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount=0;
                    _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken=false;
                }

                this.CompleteTurnWithToast("Loan amount of $20000 has been payed off.",1800);
             }
             else
             {
                this.CompleteTurnWithToast("You have not taken any loan, turn will skip now.",1800);
             }

             break;
         case "2": //hire lawyer
             console.log(this.BigBusiness[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

             if(_manager.PlayerGameInfo[_playerIndex].LawyerStatus)
             {
                this.CompleteTurnWithToast("You have already hired laywer, turn will skip now.",1800);
             }
             else
             {
                _manager.PlayerGameInfo[_playerIndex].LawyerStatus=true;
                this.CompleteTurnWithToast("You have successfully hired a lawyer.",1800);
             }

             break;
         case "3":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "4":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "5":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "6":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "7":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "8"://double pay day on next pay day
             console.log(this.BigBusiness[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

             _manager.ToggleDoublePayNextTurn(true);
             this.CompleteTurnWithToast("You will receive double profits on next payday.",1800);

             break;
         case "9":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "10":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "11"://roll dice twice, if result is >19 then take all money inside marketing.
             console.log(this.BigBusiness[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             
             var Dice1Result=_manager.RollTwoDices();
             var Dice2Result=_manager.RollTwoDices();

            //  var Dice1Result=12;
            //  var Dice2Result=12;

             var TotalResult=Dice1Result+Dice2Result;

             if(TotalResult>=19)
             {
                var _mode=GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
                 var _amount=0;
                 for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
                    _amount=_amount+_manager.PlayerGameInfo[index].MarketingAmount;
                 }

                 _manager.PlayerGameInfo[_playerIndex].Cash+=_amount;
                 this.CompleteTurnWithToast("Dice 1 Result: "+Dice1Result+"\n"+"\n"+
                 "Dice 2 Result: "+Dice2Result+"\n"+"\n"+
                 "Total: "+TotalResult+"\n"+"\n"+"\n"+
                 "Amount $"+_amount+" has successfully added in your cash from marketing amount on table."
                 ,4000);


                 if(_mode==2)
                 {
                    var _actorsArray=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

                    for (let index = 0; index < _actorsArray.length; index++) {
                        _actorsArray[index].customProperties.PlayerSessionData.MarketingAmount=0;
                    }
                 }
             }
             else
             {
                this.CompleteTurnWithToast("Dice 1 Result: "+Dice1Result+"\n"+"\n"+
                "Dice 2 Result: "+Dice2Result+"\n"+"\n"+
                "Total: "+TotalResult+"\n"+"\n"+"\n"+
                "You ran out of luck, turn will skip now"
                ,4000);
             }

             break;
         case "12":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "13":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "14":
             console.log(this.BigBusiness[Index].Description);
             break;
         case "15":
             console.log(this.BigBusiness[Index].Description);
             break;
          default:
             break;
       }

    },

    MarketingCardFunctionality(_id)
    {
      var Index=parseInt(_id);
      Index=Index-1;

       switch (_id) {
         case "1"://lose all your money in marketing account
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _loseAmount=_manager.LoseAllMarketingMoney();

             if(_loseAmount>0)
                this.CompleteTurnWithToast("You have lost your marketing amount of $"+_loseAmount,2100);
             else
                this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             break;
         case "2":
             console.log(this.Marketing[Index].Description);
             break;
         case "3":
             console.log(this.Marketing[Index].Description);
             break;
         case "4"://Your Marketing Account triples, but you must leave it in the account.
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             var _marketAmount=_manager.PlayerGameInfo[_playerIndex].MarketingAmount;
             var _multiplier=3;
             var _increaseAmount=_manager.MultiplyMarketingMoney(_multiplier);

             if(_increaseAmount>0)
             {
                this.CompleteTurnWithToast("Marketing Amount: $"+_marketAmount+"\n"+"\n"+
                "Total: "+_marketAmount+" * "+_multiplier+" = "+_increaseAmount+"\n"+"\n"+"\n"+
                "your marketing amount has been sucessfully increase to $"+_increaseAmount
                ,3100);
             }
                else
             {
                this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             }
             break;
         case "5":
             console.log(this.Marketing[Index].Description);
             break;
         case "6":
             console.log(this.Marketing[Index].Description);
             break;
         case "7":
             console.log(this.Marketing[Index].Description);
             break;
         case "8"://lose all your money in marketing account
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _loseAmount=_manager.LoseAllMarketingMoney();

             if(_loseAmount>0)
                this.CompleteTurnWithToast("You have lost your marketing amount of $"+_loseAmount,2100);
             else
                this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             break;
         case "9"://lose all your money in marketing account
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _loseAmount=_manager.LoseAllMarketingMoney();

             if(_loseAmount>0)
                this.CompleteTurnWithToast("You have lost your marketing amount of $"+_loseAmount,2100);
             else
                this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             break;
         case "10"://Receive all of your Marketing Budget back, plus 700% profit.
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             var _marketAmount=_manager.PlayerGameInfo[_playerIndex].MarketingAmount;
             var _profit=700;
             var _amount=_manager.GetMarketingMoney(_profit);

             if(_amount>0)
             {
                this.CompleteTurnWithToast("Marketing Amount: $"+_marketAmount+"\n"+"\n"+
                "Total: "+_marketAmount+" + ("+_marketAmount+"*"+_profit+" )/100"+" = "+_amount+"\n"+"\n"+"\n"+
                "your cash amount has been sucessfully increase by $"+_amount+", total cash becomes $"+_manager.PlayerGameInfo[_playerIndex].Cash
                ,4000);
             }
             else
             {
                    this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             }
             break;
         case "11":
             console.log(this.Marketing[Index].Description);
             break;
         case "12":
             console.log(this.Marketing[Index].Description);
             break;
         case "13":
             console.log(this.Marketing[Index].Description);
             break;
         case "14"://lose all your money in marketing account
             console.log(this.Marketing[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _loseAmount=_manager.LoseAllMarketingMoney();

             if(_loseAmount>0)
                this.CompleteTurnWithToast("You have lost your marketing amount of $"+_loseAmount,2100);
             else
                this.CompleteTurnWithToast("You don't have any marketing amount",2100);
             break;
         case "15":
             console.log(this.Marketing[Index].Description);
             break;
          default:
             break;
       }

    },

    LossesCardFunctionality(_id)
    {
      var Index=parseInt(_id);
      Index=Index-1;

       switch (_id) {
         case "1"://lose next turn
             console.log(this.Losses[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             _manager.ToggleSkipNextTurn(true);
             this.CompleteTurnWithToast("You will lose your next turn.",2100);
             break;
         case "2":
             console.log(this.Losses[Index].Description);
             break;
         case "3"://lose all your business profits on next Pay Day.
             console.log(this.Losses[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

             _manager.ToggleSkipPayDay_Whole(true);
             this.CompleteTurnWithToast("you will lose all your business profits on next Pay Day.",2100);
             break;
         case "4":
             console.log(this.Losses[Index].Description);
             break;
         case "5":
             console.log(this.Losses[Index].Description);
             break;
         case "6":// If Business #1 is Home Based, pay a $5,000 Insurance Deductible; if Brick & Mortar $10,000 deductible.
             console.log(this.Losses[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

             var _businessType=parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[0].BusinessType);
             if(_businessType==1) // first business was home based
             {
                 if(_manager.PlayerGameInfo[_playerIndex].Cash>=5000)
                 {
                    _manager.PlayerGameInfo[_playerIndex].Cash-=5000;
                    this.CompleteTurnWithToast("You payed $5000 insurance on your first home based business, remaining cash is $"+_manager.PlayerGameInfo[_playerIndex].Cash,2100);
                 }
                 else
                 {
                    this.CompleteTurnWithToast("you don't have enough money.",1800);
                 }
             }
             else if (_businessType==2) //first busioness was brick & mortar
             {
                if(_manager.PlayerGameInfo[_playerIndex].Cash>=10000)
                {
                   _manager.PlayerGameInfo[_playerIndex].Cash-=10000;
                   this.CompleteTurnWithToast("You payed $10000 insurance on your first brick & mortar business, remaining cash is $"+_manager.PlayerGameInfo[_playerIndex].Cash,2100);
                }
                else
                {
                   this.CompleteTurnWithToast("you don't have enough money.",1800);
                }
             }
             break;
         case "7"://lose your next Pay Day for all of your home-based businesses.
             console.log(this.Losses[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

             _manager.ToggleSkipPayDay_HomeBased(true);
             this.CompleteTurnWithToast("you will lose your next Pay Day for all of your home-based businesses.",2100);
             
             break;
         case "8":
             console.log(this.Losses[Index].Description);
             break;
         case "9":
             console.log(this.Losses[Index].Description);
             break;
         case "10":
             console.log(this.Losses[Index].Description);
             break;
         case "11":
             console.log(this.Losses[Index].Description);
             break;
         case "12":
             console.log(this.Losses[Index].Description);
             break;
         case "13":
             console.log(this.Losses[Index].Description);
             break;
         case "14":
             console.log(this.Losses[Index].Description);
             break;
         case "15":
             console.log(this.Losses[Index].Description);
             break;
          default:
             break;
       }

    },

    WildCardFunctionality(_id)
    {
      var Index=parseInt(_id);
      Index=Index-1;

       switch (_id) {
         case "1"://doubles your income on the next Pay Day.
             console.log(this.WildCards[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();

             _manager.ToggleDoublePayNextTurn(true);
             this.CompleteTurnWithToast("You will receive double profits on next payday.",1800);
             break;
         case "2"://Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
             console.log(this.WildCards[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             
             var DiceResult=_manager.RollOneDice();
             var CashMulitplier=5000;
             var TotalResult=DiceResult*CashMulitplier;

             _manager.PlayerGameInfo[_playerIndex].Cash+=TotalResult;
             this.CompleteTurnWithToast("Dice Result: "+DiceResult+"\n"+"\n"+
                "Total: "+DiceResult+" * "+CashMulitplier+" = "+TotalResult+"\n"+"\n"+"\n"+
                "Amount $"+TotalResult+" has been added into your cash."
                ,4000);

             break;
         case "3":
             console.log(this.WildCards[Index].Description);
             break;
         case "4":
             console.log(this.WildCards[Index].Description);
             break;
         case "5":
             console.log(this.WildCards[Index].Description);
             break;
         case "6":
             console.log(this.WildCards[Index].Description);
             break;
         case "7"://pay off your loan for your Brick & Mortar Business. If you have no loan outstanding, receive $50,000.
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
             var _playerIndex=GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
             
             var _loanReset=false;
             for (let index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
                var _type=parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].BusinessType);
                if(_type==2 && _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken)
                {
                    _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken=false;
                    _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount=0;
                    _loanReset=true;
                    break;
                }
            }

            if(_loanReset)
            {
                this.CompleteTurnWithToast("your outstanding loan has been payed off.",2800);
            }else
            {
                _manager.PlayerGameInfo[_playerIndex].Cash+=50000;
                this.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash",2800);
            }

             console.log(this.WildCards[Index].Description);
             break;
         case "8":
             console.log(this.WildCards[Index].Description);
             break;
         case "9":
             console.log(this.WildCards[Index].Description);
             break;
         case "10":
             console.log(this.WildCards[Index].Description);
             break;
         case "11":// receive double your business profits on all of your businesses.
             console.log(this.WildCards[Index].Description);
             var _manager=GamePlayReferenceManager.Instance.Get_GameManager();

             _manager.ToggleDoublePayNextTurn(true);
             this.CompleteTurnWithToast("You will receive double profits on next payday.",1800);
             break;
         case "12":
             console.log(this.WildCards[Index].Description);
             break;
         case "13":
             console.log(this.WildCards[Index].Description);
             break;
         case "14":
             console.log(this.WildCards[Index].Description);
             break;
         case "15":
             console.log(this.WildCards[Index].Description);
             break;
          default:
             break;
       }

    },

    InvestFunctionality()
    {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableInvest_InvestSetupUI(true);
        this.ShowCardInfo("",false);
    },
    PayDayFunctionality()
    {

    },
    DoublePayDayFunctionality()
    {

    },
    OneQuestionFunctionality()
    {
        GamePlayReferenceManager.Instance.Get_GameManager().OneQuestionScreen_Space_OneQuestion(true);
        this.ShowCardInfo("",false);
    },
    SellFunctionality()
    {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableSellScreen__SellBusinessUISetup(true);
        this.ShowCardInfo("",false);
    },
    BuyOrSellFunctionality()
    {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableBuyOrSell_BuyOrSellSetupUI(true);
        this.ShowCardInfo("",false);
    },
    GoBackFunctionality()
    {
        GamePlayReferenceManager.Instance.Get_GameManager().GoBackSpaces_spaceFunctionality();
        this.ShowCardInfo("",false);
    },
});
module.exports= DecksData;
