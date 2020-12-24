var BusinessDetail=cc.Class({
    name:"BusinessDetail",
    extends: cc.Component,

    properties: {
        BusinessName: {
            default: null,        
            type: cc.Label,
            serializable: true,
        },

        BusinessType: {
            default: null,        
            type: cc.Label,
            serializable: true,
        },

        BusinessMode: {
            default: null,        
            type: cc.Label,
            serializable: true,
        },

        BusinessBalance: {
            default: null,        
            type: cc.Label,
            serializable: true,
        },

        BusinessLocations: {
            default: null,        
            type: cc.Label,
            serializable: true,
        },

    },

    SetName(_name)
    {
        this.BusinessName.string=_name;
    },

    SetType(_type)
    {
        this.BusinessType.string=_type;
    },

    SetMode(_mode)
    {
        this.BusinessMode.string=_mode;
    },

    SetBalance(_balance)
    {
        this.BusinessBalance.string=_balance;
    },

    SetLocations(_locations)
    {
        this.BusinessLocations.string=_locations;
    },
});
