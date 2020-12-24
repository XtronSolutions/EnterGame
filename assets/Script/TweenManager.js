//-------------------------------------------class for Tween Manager-------------------------//
var TweenClass= cc.Class({
    name: "TweenManager",
    extends: cc.Component,

    properties: {
         isSplashTween: {
            displayName:"SplashTween",
            default: false,
            type: cc.boolean,
            serializable: true,
            tooltip: "Boolean to identify if this tween is related to splash screen",},
         isGamplayTween: {
            displayName:"GamplayTween",
            default: false,
            type: cc.boolean,
            serializable: true,
            tooltip: "Boolean to identify if this tween is related to Gamplay screen",},
         isLoginTween: {
            displayName:"LoginTween",
            default: false,
            type: cc.boolean,
            serializable: true,
            tooltip: "Boolean to identify if this tween is related to Login screen",}
    },

    start () {},

    onLoad() {
        if(this.isSplashTween==true)
            this.TweenSplash(this.node);
        else if(this.isGamplayTween==true || this.isLoginTween==true)
            this.FadeNodeInOut(this.node,1.5,0,255,"quadInOut");
    },

    TweenSplash: function (Node) {
        Node.opacity=0;
        cc.tween(Node)
        .to(1.5, {opacity: 255},{easing:"quadInOut"})
        .to(0.9, {opacity: 0},{easing:"quadInOut"})
        .call(() => {cc.director.loadScene("MainMenu");})
        .start();
    },

    LoginScreenTween: function (Node,FromPos) {
        Node.setPosition(0, FromPos);
        cc.tween(Node)
        .to(1, { position: cc.v2(0, 0)},{easing:"quadInOut"})
        .call(() => {})
        .start();
    },

    RepeatTweenScale: function (Node,FromScale,ToScale,time) {
        cc.tween(Node)
        .repeatForever(
            cc.tween()
            .to(time, { scale: FromScale }, { easing: 'quadInOut'})
            .to(time, { scale: ToScale }, { easing: 'quadInOut'})
            .call(() => {})
        )
        .start();
    },

    FadeNodeInOut: function (Node,time,InitialOp,FinalOp,EaseType) {
        Node.opacity=InitialOp;
        cc.tween(Node)
        .to(time, {opacity: FinalOp},{easing:EaseType})
        .call(() => { })      
        .start();
    },
});
module.exports= TweenClass;

