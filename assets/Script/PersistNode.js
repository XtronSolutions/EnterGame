var PersistNode=cc.Class({
    name:"PersistNode",
    extends: cc.Component,

    properties: {
        musicProp: {
            // ATTRIBUTES:
            default: null,
            type: cc.AudioClip,
            serializable: true,
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    statics: {
        //creating static instance of the class
        Instance: null,
      },

    onLoad () {
        if (!PersistNode.Instance) {
            cc.game.addPersistRootNode(this.node);
            PersistNode.Instance=this;
            var iD=cc.audioEngine.playMusic(this.musicProp,true);
            cc.audioEngine.setVolume(iD, 0.8);
        }
    },

    update()
    {
        console.log("here");
    },
});
