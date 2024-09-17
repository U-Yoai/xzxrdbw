//===========================================================================
// CallMapEvent.js
//===========================================================================

/*:
 * @plugindesc プラグインコマンドでマップイベントを呼び出します。
 * @author Shun
 *
 * 
 * @help
 * 
 * @param MapId
 * @type number
 * @default 1
 * 
 * プラグインコマンド詳細
 * CallMapEvent [eventId] [pageIndex]
 * CME [eventId] [pageIndex]
 * 
 */

(function () {

    function mapId2FileName(mapId) {
        return 'Map' + ('000' + mapId).slice(-3) + '.json';
    }

    var convertEscapeCharacters = function (text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var parameters = PluginManager.parameters('CallMapEvent');
    var eventMapId = parseInt(JSON.parse(parameters['MapId']));
    var eventMapFile = mapId2FileName(eventMapId);

    window.$dataEventMap = null;
    window.$gameEventMap = null;

    DataManager._databaseFiles.push(
        { name: "$dataEventMap", src: eventMapFile }
    )

    var _DataManagerCreateGameObjects = DataManager.createGameObjects
    DataManager.createGameObjects = function () {
        _DataManagerCreateGameObjects.call(this);
        $gameEventMap = new Game_EventMap();
    };

    var _DataManagerSetupNewGame = DataManager.setupNewGame
    DataManager.setupNewGame = function () {
        _DataManagerSetupNewGame.call(this);
        $gameEventMap.setup(eventMapId);
    };

    var _DataManagerEXtractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManagerEXtractSaveContents.call(this, contents);
        $gameEventMap.setup(eventMapId);
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        switch (command) {
            case "CallMapEvent": case "CME":
                var eventId = parseInt(convertEscapeCharacters(args[0]));
                var pageIndex = parseInt(convertEscapeCharacters(args[1]));
                if (!pageIndex) {
                    pageIndex = -1;
                }

                this.callMapEvent(eventId, pageIndex);
                break;
        }
    };

    Game_Interpreter.prototype.callMapEvent = function (eventId, pageIndex) {
        const event = $gameEventMap.event(eventId);
        if (pageIndex < 0) {
            pageIndex = event.findProperPageIndex();
            if (pageIndex < 0) {
                return;
            }
        }
        else {
            pageIndex -= 1;
        }
        event._pageIndex = pageIndex;
        this.setupChild(event.list(), this._eventId);
    }

    class Game_EventMap extends Game_Map {
        setup(mapId) {
            if (!$dataEventMap) {
                throw new Error('The map data is not available');
            }
            this._mapId = mapId;
            this._displayX = 0;
            this._displayY = 0;
            this.setupEvents();
            this._needsRefresh = false;
        };

        data() {
            return $dataEventMap.data;
        };

        setupEvents() {
            this._events = [];
            for (var i = 0; i < $dataEventMap.events.length; i++) {
                if ($dataEventMap.events[i]) {
                    this._events[i] = new Game_MapEvent(this._mapId, i);
                }
            }
            this._commonEvents = this.parallelCommonEvents().map(function (commonEvent) {
                return new Game_CommonEvent(commonEvent.id);
            });
            this.refreshTileEvents();
        };
    }

    class Game_MapEvent extends Game_Event {
        event() {
            return $dataEventMap.events[this._eventId];
        }
        initialize(mapId, eventId) {
            this._mapId = mapId;
            this._eventId = eventId;
            this.refresh();
        }
        loadTagParam() {
            return false;
        };
    }

    ClassRegister(Game_EventMap);

})();