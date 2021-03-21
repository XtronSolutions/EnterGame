
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/BusinessDetail');
require('./assets/Script/DecksData');
require('./assets/Script/DiceController');
require('./assets/Script/ExpandBusinessHandler');
require('./assets/Script/GameManager');
require('./assets/Script/GamePlayReferenceManager');
require('./assets/Script/GameplayUIManager');
require('./assets/Script/MultiplayerController');
require('./assets/Script/MultiplayerSyncManager');
require('./assets/Script/PersistNode');
require('./assets/Script/PlayerDetails');
require('./assets/Script/PlayerProfileManager');
require('./assets/Script/Preloading');
require('./assets/Script/QuestionsData');
require('./assets/Script/RoomListHandler');
require('./assets/Script/ServerBackend');
require('./assets/Script/SpaceHandler');
require('./assets/Script/SpacesManager');
require('./assets/Script/StorageManager');
require('./assets/Script/TweenManager');
require('./assets/Script/UIManager');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();