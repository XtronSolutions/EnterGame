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

var allSpaces=["None","Wild Card","Big Business","Marketing","Invest","Losses","Pay Day","Double Pay Day","One Question","Sell","Buy Or Sell","Go Back 3 Spaces"];
//-------------------------------------------class Spaces Data-------------------------//
var SpaceData = cc.Class({
         name: "SpaceData",
    properties: {
        Name: "Data",
        SpacesType:
        {
            type: EnumSpaceType,
            default: EnumSpaceType.None,
            serializable: true,
            tooltip:"states machines by type of spaces on board",}, 
        SpaceDescription:
        {
            type: "Description",
            type: cc.Text,
            default: "",
            serializable: true,
            tooltip: "Description of spaces",},
        ReferenceLocation:
        {
            displayName:"SpaceObject",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "Background image associated by the space",},
        CanHaveBG:
        { 
            displayName: "ISBG",
            default: false,
            type: cc.boolean,
            serializable: true,
            tooltip: "if space could have background",},
        BGColor:
        { 
            displayName: "BGColor",
            default: cc.Color.WHITE,
            type: cc.Color,
            serializable: true,
            tooltip: "Color of the background",},
    },

    ctor: function () {
       
    }
});

//-------------------------------------------Class for Spaces Manager-------------------------//
var SpacesManager=cc.Class({
    name: "SpacesManager",
    extends: cc.Component,
    properties: {
        Data: {
            default: [],                
            type: [SpaceData],
            serializable: true,
        },
      
    },

    ctor: function () {
    },

    onLoad() {
        this.CreateSpacesPool();
    },

    start () {

    },

    CreateSpacesPool: function () {
      for(var i=0;i<this.Data.length;i++)
      {
        if(this.Data[i].ReferenceLocation.childrenCount>0)
        {
           
          this.Data[i].ReferenceLocation.active=true;
          this.Data[i].ReferenceLocation.getComponent('SpaceHandler').InitializeData(this.Data[i]);
          this.Data[i].ReferenceLocation.children[0].active=true;

            if(this.Data[i].CanHaveBG)
            {
                this.Data[i].ReferenceLocation.children[0].children[0].active=true;
                this.Data[i].ReferenceLocation.children[0].children[0].color=this.Data[i].BGColor;
            }
            else
            {
                this.Data[i].ReferenceLocation.children[0].children[0].active=false; 
            }

            this.Data[i].ReferenceLocation.children[0].children[1].getComponent(cc.Label).string=allSpaces[parseInt(this.Data[i].SpacesType)]
        }
      }
    },
});
//module.exports= SpaceData;
module.exports= SpacesManager;
