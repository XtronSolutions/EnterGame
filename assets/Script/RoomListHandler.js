var GamePlayReferenceManager=null;
var RoomListHandler=cc.Class({
    name:"RoomListHandler",
    extends: cc.Component,

    properties: {
        NameLabel: {
            default: null,
            type: cc.Label,
            serializable: true,},
        PlayersLabel: {
            default: null,
            type: cc.Label,
            serializable: true,},
        RoomName: {
            default: "",
            type: cc.Text,
            serializable: true,},
    },

    onEnable()
    {
        this.RoomName="";
        this.CheckReferences();
    },

    CheckReferences()
    {
       if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            GamePlayReferenceManager=require('GamePlayReferenceManager');
    },

    SetRoomName(_name)
    {
        this.RoomName=_name;
        console.log(this.RoomName);
        this.NameLabel.string=_name;
    },

    SetPlayerCount(_count)
    {
        this.PlayersLabel.string="Players:"+_count;
    },

    SpectateRoom()
    {
        GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(true);
        this.CheckReferences();
        this.RoomName=this.NameLabel.string;
        console.log(this.NameLabel.string);
        console.log(this.RoomName);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(2);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRoom(this.RoomName);
    },
});
