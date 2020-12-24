var GamePlayReferenceManager=null;
var SpacesManager=require('SpacesManager');
//-------------------------------------------class for SpaceHandler-------------------------//

var SpaceHandler=cc.Class({
    name: "SpaceHandler",
    extends: cc.Component,

    properties: {
    },

    onLoad()
    {
        this.CheckReferences();
        this.SpaceData=null;
       // SpaceData=new 

    },

    CheckReferences()
    {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            GamePlayReferenceManager=require('GamePlayReferenceManager');
    },

    InitializeData(_data)
    {
        this.SpaceData=_data;
        //console.log(this.SpaceData);
    },

    OnLandedOnSpace(_isOwner=false,_randomValue=0)
    {
        console.log(this.SpaceData);
        switch (this.SpaceData.SpacesType) {
            case 0://None
                console.error("landed on none");
                //GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner,this.SpaceData.SpacesType);
                break;
            case 1://WildCard
                console.log("WildCard");    
                GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomWildCard(_isOwner,_randomValue);
                break;
            case 2://BigBusiness
                console.log("BigBusiness");   
                GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomBigBusinessCard(_isOwner,_randomValue);
                break;
            case 3://Marketing
                console.log("Marketing"); 
                GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomMarketingCard(_isOwner,_randomValue);
                break;
            case 4://Invest
                console.log("Invest"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner,this.SpaceData.SpacesType);
                break;
            case 5://Losses
                console.log("Losses"); 
                GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomLossesCard(_isOwner,_randomValue);
                break;
            case 6://Payday
                console.log("Payday"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpacePayDay(_isOwner,this.SpaceData.SpacesType);
                break;
            case 7://DoublePayDay
                console.log("DoublePayDay"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceDoublePayDay(_isOwner,this.SpaceData.SpacesType);
                break;
            case 8://OneQuestion
                console.log("OneQuestion"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceOneQuestion(_isOwner,this.SpaceData.SpacesType);
                break;
            case 9://Sell
                console.log("Sell"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceSell(_isOwner,this.SpaceData.SpacesType);
                break;
            case 10://BuyOrSell
                console.log("BuyOrSell"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceBuyOrSell(_isOwner,this.SpaceData.SpacesType);
                break;
            case 11://GoBackSpaces
                console.log("GoBackSpaces"); 
                GamePlayReferenceManager.Instance.Get_DecksData().SpaceGoBackSpaces(_isOwner,this.SpaceData.SpacesType);
                break;
            default:
                break;
        }

    },
});
