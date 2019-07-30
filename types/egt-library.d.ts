declare namespace Pluck {
    abstract class Model {
        sendNotification(type: string, body?: any): void;
        dispose(): void;
    }
}
declare namespace Pluck {
    class Notification {
        private _name;
        private _body;
        constructor(name: string, body: any);
        readonly name: string;
        readonly body: any;
    }
}
declare namespace Pluck {
    class NotificationMap {
        private data;
        constructor();
        register(controller: ViewController): void;
        unregister(controller: ViewController): void;
        notify(notification: Notification): void;
        private registerRecipient(notificationName, controller);
        private getRecipients(notificationName);
    }
}
declare namespace Pluck {
    class HashMap {
        private keyArray;
        private valueArray;
        constructor();
        add(key: any, value: any): void;
        getVal(key: any): any;
        del(key: any): void;
    }
}
declare namespace Pluck {
    class ViewController {
        static controllerMap: HashMap;
        static notificationMap: NotificationMap;
        static root: ViewController;
        protected _view: any;
        protected _model: any;
        protected _shouldReceiveNotifications: boolean;
        parent: ViewController;
        children: any[];
        autoDispose: boolean;
        constructor(view?: any, model?: any);
        static setRoot(root: ViewController): void;
        static getRoot(): ViewController;
        static disposeRootController(): void;
        readonly shouldReceiveNotifications: boolean;
        getInterests(): Array<string>;
        sendNotification(type: string, body?: Object): void;
        handleNotification(notification?: Notification): void;
        onRegister(): void;
        onUnregister(): void;
        hasChildViewController(controller: ViewController): boolean;
        addChildViewController(controller: ViewController): ViewController;
        removeChildViewController(controller: ViewController): void;
        destroy(): void;
        dispose(): void;
        getController(constructor: any): ViewController;
        unique(): ViewController;
        zIndex: number;
    }
}
declare namespace Pluck {
    class ArrayTools {
        constructor();
        static flatten(array: Array<any>): any[];
        static equals(arr1: Array<any>, arr2: Array<any>): boolean;
        static diff(array: Array<any>, compare: any): any[];
    }
}
declare namespace Pluck {
    class External {
        serialize(obj: Object): void;
    }
}
declare namespace Pluck {
    class GlobalFNs {
        constructor();
        static isMobile(): boolean;
        static getQualifiedClassName(object: any): any;
    }
}
declare namespace com.egt.library {
    enum DeviceOrientation {
        Portrait = "portrait",
        Landscape = "landscape",
    }
}
declare namespace com.egt.library {
    class Device {
        static readonly isMobile: boolean;
        static readonly isiOS: boolean;
        static readonly isAndroid: boolean;
        static readonly isCriOS: boolean;
        static readonly isChrome: boolean;
        static readonly isSafari: boolean;
        static readonly isFirefox: boolean;
        static readonly isIE11: boolean;
        static readonly currentOrientation: DeviceOrientation;
        static resolveEvent(eventName: string): string;
        static isSoundSupported(): boolean;
        static getAudioContext(): any;
    }
}
declare namespace com.egt.library.events {
    class Event {
        type: string;
        data: any;
        bubbles: boolean;
        cancelable: boolean;
        target: any;
        currentTarget: any;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare namespace com.egt.library.events {
    class EventDispatcher implements IEventDispatcher {
        private _listeners;
        constructor();
        addEventListener(type: string, callback: Function, callbackContext: any): void;
        dispatchEvent(event: Event, target?: any): void;
        removeEventListener(type: string, callback: Function, callbackContext: any): void;
        hasEventListener(type: any): boolean;
        dispose(): void;
    }
}
declare namespace com.egt.library.events {
    interface IEventDispatcher {
        addEventListener(type: string, callback: Function, callbackContext: any): void;
        dispatchEvent(event: Event, target?: any): void;
        hasEventListener(type: string): boolean;
        removeEventListener(type: string, callback: Function, callbackContext: any): void;
        dispose(): any;
    }
}
declare namespace com.egt.library.events {
    class LoaderEvent extends Event {
        static readonly COMPLETE: string;
        static readonly CHILD_COMPLETE: string;
        static readonly PROGRESS: string;
        static readonly CHILD_PROGRESS: string;
        static readonly ERROR: string;
        static readonly CHILD_ERROR: string;
        static readonly DECODE_ERROR: string;
        constructor(type: string, data?: any);
    }
}
declare namespace com.egt.library.loading {
    import EventDispatcher = com.egt.library.events.EventDispatcher;
    abstract class Loader extends EventDispatcher {
        protected static loaders: any;
        static prependURL: string;
        static cacheTimestamp: string;
        protected _id: string;
        abstract getData(): any;
        protected static addLoader(loader: Loader): void;
        protected static removeLoader(loader: Loader): void;
        static getLoader(id: string): Loader;
        readonly id: string;
    }
}
declare namespace com.egt.library.loading {
    abstract class BaseLoader extends Loader {
        static STATE_IDLE: number;
        static STATE_LOADING: number;
        static STATE_LOADED: number;
        static STATE_ERROR: number;
        protected _state: number;
        protected _lastProgress: number;
        protected _src: string;
        protected _id: string;
        protected _loadingRequested: boolean;
        protected _request: any;
        protected _cacheTimestamp: string;
        protected _prependURL: string;
        protected _getParameters: string;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        abstract getData(): any;
        readonly src: string;
        isIdle(): boolean;
        isLoading(): boolean;
        isLoaded(): boolean;
        hasError(): boolean;
        load(): void;
        stop(): void;
        dispose(): void;
        protected abstract getResponseType(): string;
        protected abstract onLoaded(event?: any): void;
        protected abstract onError(event: any): void;
        protected setUpRequest(): void;
        private openRequest();
        private constructGetParameters();
        private onXHRReadyStateChange(event);
        private onXHRProgress(event);
    }
}
declare namespace com.egt.library.loading {
    class FontLoader extends BaseLoader {
        private _fontFamily;
        private _fontContent;
        private _styleTag;
        constructor(fontFamily: string, fontContent: string);
        getData(): any;
        load(): void;
        dispose(): void;
        protected getResponseType(): string;
        protected setUpRequest(): void;
        protected onLoaded(event?: any): void;
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.loading {
    class JSONLoader extends BaseLoader {
        private _data;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        protected getResponseType(): string;
        protected onLoaded(event: any): void;
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.loading {
    class LayoutImporter {
        private _elementsWithID;
        private _mainContainer;
        private _pixiLoader;
        constructor();
        import(json: any, loader: PIXILoader): {
            "elementsWithID": any;
            "mainContainer": PIXI.Container;
        };
        private importElements(json);
        private switchType(json);
        private createRectangle(props);
        private createRoundedRectangle(props);
        private createImage(props);
        private createText(props);
        private createBitmapText(props);
        private checkForIDandAdd(element, props, parent);
    }
}
declare namespace com.egt.library.loading {
    class LayoutLoader extends BaseLoader {
        private _jsonLoader;
        private _resourcesLoader;
        private _pixiLoader;
        private _videoAlternativeLoader;
        private _videoLoaders;
        private _data;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        getTexture(name: string): PIXI.Texture;
        getTextureSequence(sequenceName: string, extension: string, texturesCount?: number, sequenceDigitsCount?: number): Array<PIXI.Texture>;
        load(): void;
        stop(): void;
        dispose(): void;
        protected getResponseType(): string;
        protected setUpRequest(): void;
        private parseLayout();
        private onJSONLoaded(event);
        private onResourcesLoaded(event);
        protected onLoaded(): void;
        private onProgress(event);
        protected onError(event: any): void;
        protected onVideoDecodeError(): void;
    }
}
declare namespace com.egt.library.loading {
    class LoadingQueue extends Loader {
        private _state;
        private _asyncScriptExecution;
        private _loaders;
        private _scriptLoaders;
        private _loadersCount;
        private _completeLoadersCount;
        private _progress;
        constructor(asyncScriptExecution?: boolean, id?: string);
        isIdle(): boolean;
        isLoading(): boolean;
        isLoaded(): boolean;
        hasError(): boolean;
        addLoader(loader: BaseLoader): void;
        removeLoader(loader: BaseLoader): void;
        load(): void;
        stop(): void;
        getData(): any;
        dispose(): void;
        private disposeLoader(loader);
        private removeLoaderListeners(loader);
        private loaderHasLoaded(event?);
        private onLoaderLoaded(event);
        private onLoaderProgress(event);
        private onLoaderError(event);
    }
}
declare namespace com.egt.library.loading {
    class PIXILoader extends BaseLoader {
        private _pixiLoader;
        private _textures;
        constructor(cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        getTexturesCount(): number;
        getTexture(name: string): PIXI.Texture;
        getTextureSequence(sequenceName: string, extension: string, texturesCount?: number, sequenceDigitsCount?: number): Array<PIXI.Texture>;
        load(): void;
        stop(): void;
        addResource(name: string, src: string): void;
        dispose(): void;
        protected getResponseType(): string;
        protected setUpRequest(): void;
        private collectTextures();
        protected onLoaded(event?: any): void;
        private onProgress(event);
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.loading {
    class ScriptLoader extends BaseLoader {
        private _script;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        load(): void;
        stop(): void;
        dispose(): void;
        protected getResponseType(): string;
        protected setUpRequest(): void;
        protected onLoaded(event?: any): void;
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.loading {
    class SoundLoader extends BaseLoader {
        private _data;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        protected getResponseType(): string;
        protected onLoaded(event: any): void;
        protected onError(event: any): void;
        private onBufferDecoded(buffer);
        private onBufferDecodeError();
    }
}
declare namespace com.egt.library.loading {
    class VideoLoader extends BaseLoader {
        private _video;
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        protected getResponseType(): string;
        protected onLoaded(event?: any): void;
        protected onCanPlay(): void;
        protected onDecodeError(): void;
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.loading {
    class XMLLoader extends BaseLoader {
        constructor(src: string, cacheTimestamp?: string, prependURL?: string, id?: string);
        getData(): any;
        protected getResponseType(): string;
        protected onLoaded(event: any): void;
        protected onError(event: any): void;
    }
}
declare namespace com.egt.library.utils {
    class BrowserDetect {
        static detect(): any;
        private static detectOS(userAgentString);
        private static parseUserAgent(userAgentString);
        private static getBrowserRules();
        private static getOperatingSystemRules();
        private static buildRules(ruleTuples);
    }
}
declare namespace com.egt {
    let projectMetadata: com.egt.library.Project;
}
declare namespace com.egt.library {
    class LogServer {
        private static readonly ErrorLogServerAdress;
        private static readonly LogObjectServerAdress;
        private static readonly serverPostError;
        private static readonly serverPostStatistic;
        static sendStatisticUsage(data?: any): void;
        static sendError(e: ProjectError): void;
        static sendLog(objectToLog: object): void;
        private static postData(url, data, callback?);
    }
    interface Project {
        projectName?: string;
        projectBuild?: string;
    }
    interface ProjectError extends Project {
        error: object;
        additional?: object;
    }
}
declare namespace com.egt.library {
    import DeviceOrientation = com.egt.library.DeviceOrientation;
    abstract class MobileView extends PIXI.Container {
        static dispose(): void;
        static readonly deviceOrientation: DeviceOrientation;
        protected static listenForOrientationChange(): void;
        protected static onOrientationChange(): void;
        protected static callOrientationChange(): void;
        private static _instances;
        private static _currentOrientation;
        private static _isListening;
        constructor();
        protected abstract onRotationChange(): void;
    }
}
declare namespace com.egt.library.players {
    enum MediaEvents {
        play = "play",
        pause = "pause",
        ended = "ended",
        error = "error",
        videoReady = "videoReady",
    }
}
declare namespace com.egt.library.utils.log {
    const log: Function;
    const warn: Function;
    const error: Function;
    let isEnabled: boolean;
    let isStylized: boolean;
    class Config {
        style?: string;
        isEnabled?: boolean;
        isStylized?: boolean;
    }
    function decorator(...args: any[]): any;
    function decoratorConfig(config: any): Function;
}
declare namespace com.egt.library.players {
    class VideoPlayer extends PIXI.Sprite {
        protected loaderId: string;
        log: any;
        warn: any;
        error: any;
        protected _video: any;
        protected _isVideoReady: boolean;
        protected _isPlaying: boolean;
        protected _width: number;
        protected _height: number;
        protected _frameProcessInterval: number;
        protected _frameProcessIntervalMs: number;
        protected _onPlay: Function;
        protected _onEnded: Function;
        protected _onPause: Function;
        protected _onError: Function;
        protected _onTimeUpdate: Function;
        protected _outputCanvas: any;
        protected _outputCanvasContext: any;
        protected _outputTexture: any;
        constructor(loaderId: string, loop?: boolean, autoPlay?: boolean, muted?: boolean, volume?: number, fps?: number);
        play(): this;
        pause(): this;
        destroy(): void;
        fps: number;
        loop: boolean;
        muted: boolean;
        volume: number;
        readonly duration: number;
        currentTime: number;
        readonly ended: boolean;
        width: number;
        height: number;
        readonly paused: boolean;
        protected createElements(): void;
        protected setResolution(): void;
        protected loadVideo(): void;
        protected onTimeUpdate(): void;
        protected processFrame(): void;
        protected onEnded(): void;
        protected onPlay(): void;
        protected onPause(): void;
        protected onError(): void;
        protected attachEvents(): void;
        protected detachEvents(): void;
        protected _play(): any;
        protected _pause(processLastFrame?: boolean): any;
        toString(): string;
    }
}
declare namespace com.egt.library.players {
    class VideoPlayerAlpha extends VideoPlayer {
        protected _bufferCanvas: any;
        protected _bufferCanvasContext: any;
        destroy(): void;
        protected createElements(): void;
        protected setResolution(): void;
        protected processFrame(): void;
    }
}
declare namespace com.egt.library.sound {
    import IEventDispatcher = com.egt.library.events.IEventDispatcher;
    interface Sound extends IEventDispatcher {
        volume: number;
        playbackRate: number;
        stop(): void;
    }
}
declare namespace com.egt.library.sound {
    import LoaderEvent = com.egt.library.events.LoaderEvent;
    import EventDispatcher = com.egt.library.events.EventDispatcher;
    class SoundManager extends EventDispatcher {
        log: any;
        warn: any;
        error: any;
        static SOUND_LOADED: string;
        protected _soundLoaders: any;
        protected _cacheTimestamp: string;
        protected _audioContext: AudioContext;
        protected _masterGain: GainNode;
        protected _soundSources: any;
        protected _sounds: any;
        protected _soundBuffers: any;
        protected _mute: boolean;
        constructor(cacheTimestamp?: string);
        playDummySound(dummyBuffer: AudioBuffer): void;
        registerSounds(sounds: Array<any>, prependURL?: string, cacheTimestamp?: string): void;
        hasSound(soundName: string): boolean;
        isSoundLoaded(soundName: string): boolean;
        load(id: string): void;
        loadAll(): void;
        getSoundDuration(soundName: string): number;
        play(soundName: string, loop?: boolean, volume?: number): Sound;
        playStream(soundURI: string): Sound;
        readonly isContextSuspended: boolean;
        isMuted: boolean;
        dispose(): void;
        protected onSoundLoaded(event: LoaderEvent): void;
        protected onSoundError(event: LoaderEvent): void;
    }
}
declare namespace com.egt.library.utils {
    class CanvasConsoleConfig {
        consoleWidth: number;
        consoleHeight: number;
        consoleAlpha: number;
        addHideButton: boolean;
        addScrollButtons: boolean;
        attatchConsoleLog: boolean;
        attatchConsoleError: boolean;
        backgroundColor: number;
        scrollButtonsColor: number;
        showOnError: boolean;
    }
    class CanvasConsole extends PIXI.Container {
        private static readonly SCROLLING_Y_STEP;
        private static readonly TEXT_STARTING_X;
        private static readonly TEXT_STARTING_Y;
        private static readonly TEXT_Y_SPACING;
        private static instance;
        private consoleContainer;
        private errorCounter;
        private config;
        private scrollDownButton;
        private scrollUpButton;
        private hideButton;
        constructor(config?: CanvasConsoleConfig);
        static getInstance(): CanvasConsole;
        show(): CanvasConsole;
        hide(): CanvasConsole;
        print(message: string, color?: number, fontSize?: number): CanvasConsole;
        clearConsole(): CanvasConsole;
        scrollDown(timesScroll?: number): CanvasConsole;
        scrollUp(timesScroll?: number): CanvasConsole;
        dispose(): void;
        private init();
        private attachToConsole();
        private printLog(message);
        private printError(message);
        private setupScrollButtonsEvents(on?);
        private setupHideButtonEvents(on?);
        private onHideButtonClicked();
        private onScrollDownButtonClicked();
        private onScrollUpButtonClicked();
        private getTriangle(color);
        private getRect(color, width, height);
    }
}
declare namespace com.egt.library.utils {
    function decimalToHexColorString(value: number): string;
}
declare namespace com.egt.library.utils {
    class ErrorSerializer {
        static Serialize(value: any): any;
        private static destroyCircular(from, seen);
    }
}
declare namespace com.egt.library.utils {
    function sortCells(cells: Array<number>, isColFirst?: boolean): Array<number>;
    function splitIntoRows(cells: Array<number>, isColFirst?: boolean, fillEmptyRows?: boolean): Array<Array<number>>;
}
declare namespace com.egt.library.utils {
    import EventDispatcher = com.egt.library.events.EventDispatcher;
    class Timer extends EventDispatcher {
        static TIMER_COMPLETE: string;
        static TIMER: string;
        private _delay;
        private _repeatCount;
        private _currentCount;
        private _delayedCall;
        constructor(delay: number, repeatCount?: number);
        readonly currentCount: number;
        readonly running: boolean;
        repeatCount: number;
        delay: number;
        start(): void;
        stop(): void;
        reset(): void;
        private readonly isFinished;
        private onDelay();
    }
}
declare namespace com.egt.library.utils {
    class UncaughtErrorsHandler {
        private _callback;
        private _listening;
        constructor(callback: any, startListening?: boolean);
        startListening(): void;
        stopListening(): void;
        dispose(): void;
        _setupEvents(attatch?: boolean): void;
    }
}
declare namespace com.egt.library {
    class Utils {
        static convertToSequenceString(num: number, sequenceDigitsCount?: number): string;
        static formatMoney(num: number, denom: number, formatCurrency?: Boolean, noCoins?: boolean, separator?: String): string;
        static randomNumberInRange(rangeStart: number, rangeEnd: number): number;
    }
}
declare namespace com.egt.library.widgets {
    class BitmapMoneyText extends PIXI.Container {
        protected _moneyText: PIXI.extras.BitmapText;
        protected _centsText: PIXI.extras.BitmapText;
        protected _currencyText: PIXI.extras.BitmapText;
        protected _suffix: PIXI.extras.BitmapText;
        private _config;
        private _diamondImage;
        private _rect;
        constructor(config: any);
        money: number;
        align: string;
        bounds: any;
        isShowingCredits: boolean;
        denomination: number;
        prefix: string;
        suffix: string;
        recalcVerticalOffset(): void;
        moneyTextPositionY: number;
        centsTextPositionY: number;
        currencyTextPositionY: number;
        font: any;
        moneyFont: any;
        centsFont: any;
        suffixFont: any;
        currencyFont: any;
        scaleDiamond: number;
        private resizeDiamond();
        setScaleDiamondCoef: number;
        protected createTextFields(): void;
        protected positionText(): void;
        readonly textWidth: number;
        setCentsPositionOffsetPercentX(muneyEnd: number, centsBegin: number, moneyTextHeight: number): void;
        setCurrencyPositionOffsetPercentX(centsEnd: number, currencyBegin: number, moneyTextHeight: number): void;
        readonly moneyTextLetterSpacing: number;
        protected calcHorizontalOffset(): void;
        private resetAllTextWidthHeight();
        private resetCurrencyTextWidthHeight();
        private resetCentsTextWidthHeight();
        private resetMoneyTextWidthHeight();
        private resetSuffixWidthHeight();
        dispose(): void;
        protected resetFonts(): void;
        protected fitToBounds(): void;
    }
}
declare namespace com.egt.library.widgets {
    class Button extends PIXI.Container {
        static STATE_UP: string;
        static STATE_DOWN: string;
        static STATE_OVER: string;
        static STATE_DISABLED: string;
        protected _isDown: boolean;
        protected _isOver: boolean;
        protected _background: PIXI.Sprite;
        protected _textures: any;
        protected _state: string;
        protected _scaleTween: TweenMax;
        shouldScale: boolean;
        constructor(textures: any);
        refreshState(): void;
        dispose(): void;
        textures: any;
        protected setImageForState(state: string): void;
        protected onMouseDown(): void;
        protected onMouseUp(): void;
        protected onMouseOver(): void;
        protected onMouseOut(): void;
    }
}
declare namespace com.egt.library.widgets {
    class MoneyText extends PIXI.Container {
        log: any;
        protected _moneyText: PIXI.Text;
        protected _decimalSymbolText: PIXI.Text;
        protected _centsText: PIXI.Text;
        protected _currencyText: PIXI.Text;
        protected _suffix: PIXI.Text;
        private _config;
        private _diamondImage;
        private _boundsDebug;
        private _integerDebug;
        private _decimalDebug;
        private _decimalSymbolDebug;
        private _currencyDebug;
        private _suffixDebug;
        private _lastCalculatedWidths;
        constructor(config: any);
        readonly moneyString: string;
        readonly centsString: string;
        money: number;
        bounds: any;
        isShowingCredits: boolean;
        denomination: number;
        prefix: string;
        suffix: string;
        style: any;
        moneyStyle: any;
        centsStyle: any;
        currencyStyle: any;
        suffixStyle: any;
        moneyFontSize: number;
        centsFontSize: number;
        currencyFontSize: number;
        scaleDiamond: number;
        private resizeDiamond();
        private calculateFontProperty();
        protected createTextFields(): void;
        protected createDebugFields(): void;
        protected positionText(): void;
        readonly Y: number;
        readonly textWidth: number;
        readonly isCurrencyVisible: boolean;
        readonly isSuffixVisible: boolean;
        readonly isDiamondVisible: boolean;
        calculateWidths(): {
            integer: number;
            integerText: number;
            decimal: number;
            decimalText: number;
            decimalSymbol: number;
            decimalSymbolText: number;
            currency: number;
            suffix: number;
            suffixText: number;
        };
        dispose(): void;
        protected resetFontSizes(): void;
        protected fitToBounds(): void;
    }
}
declare namespace com.egt.library.widgets {
    class RollingBitmapNumberView extends PIXI.Container {
        protected _config: any;
        protected _digits: PIXI.Container[];
        protected _digitTweens: TweenMax[];
        protected _digitWidth: number;
        protected _digitHeight: number;
        protected _startPosition: number;
        protected _leftPadding: number;
        protected _dotTextField: PIXI.extras.BitmapText;
        protected _currencyTextField: PIXI.Text;
        protected _diamondBitmap: PIXI.Sprite;
        protected _finalValue: number;
        protected _currValue: number;
        protected _finalCentValue: number;
        protected _delta: number;
        protected _direction: number;
        protected _oldDirection: number;
        protected _timePerCent: number;
        protected _totalTime: number;
        protected _dummyObject: any;
        protected _failSafeTween: TweenMax;
        protected _numberOfSeparators: number;
        protected _currency: any;
        protected _storedMask: PIXI.Graphics;
        constructor(config: object);
        isAnimating(): boolean;
        denomination(value: number): void;
        killTweens(): void;
        currency(val: boolean): void;
        setBounds(value: any): void;
        setValue(value: number, animating?: boolean, time?: number): void;
        complete(): void;
        protected createMask(): void;
        protected animateDigit(index: number): void;
        protected setFinalValue(): void;
        protected onCentAnimationComplete(index: any): void;
        protected onFailSafeTweenUpdate(): void;
        protected onFadeOutComplete(): void;
        protected createNumbers(): void;
    }
}
declare namespace com.egt.library.widgets {
    class RollingNumberView extends PIXI.Container {
        protected _config: any;
        protected _digits: PIXI.Container[];
        protected _digitTweens: TweenMax[];
        protected _startPosition: number;
        protected _dotTextField: PIXI.Text;
        protected _finalValue: number;
        protected _currValue: number;
        protected _finalCentValue: number;
        protected _delta: number;
        protected _direction: number;
        protected _oldDirection: number;
        protected _timePerCent: number;
        protected _totalTime: number;
        protected _dummyObject: any;
        protected _failSafeTween: TweenMax;
        protected _currency: any;
        protected _storedMask: PIXI.Graphics;
        constructor(config: object);
        isAnimating(): boolean;
        denomination(value: number): void;
        killTweens(): void;
        currency(val: boolean): void;
        setBounds(value: any): void;
        setValue(value: number, animating?: boolean, time?: number): void;
        complete(): void;
        protected createMask(): void;
        protected animateDigit(index: number): void;
        protected setFinalValue(): void;
        protected onCentAnimationComplete(index: any): void;
        protected onFailSafeTweenUpdate(): void;
        protected onFadeOutComplete(): void;
        protected createNumbers(): void;
    }
}
declare namespace com.egt.library.widgets {
    class ScrollView extends PIXI.Container {
        static DECAY: number;
        static BOUNCING_DECAY: number;
        static SPEED_SPRINGNESS: number;
        static BOUNCING_SPRINGESS: number;
        static DRAG_DECAY: number;
        private _contentView;
        private _maskSize;
        private _touchDown;
        private _posY;
        private _lastPosY;
        private _startPosY;
        private _startTouchPosY;
        private _scrollSpeed;
        private _stopAnimation;
        constructor();
        contentView: PIXI.Container;
        setSize(width: number, height: number): void;
        dispose(): void;
        private createMask(width, height);
        private animateScroll();
        private onMouseDown(event);
        private onMouseMove(event);
        private onMouseUp(event);
    }
}
declare namespace com.egt.library.widgets {
    class StateButton extends Button {
        protected _states: any;
        protected _texturesState: string;
        constructor(states: any, initialState: string);
        state(state?: string): any;
    }
}
declare namespace com.egt.library.widgets {
    class Text extends PIXI.Container {
        private _config;
        protected _text: PIXI.Text;
        protected _originalFontSize: number;
        protected _rect: PIXI.Graphics;
        constructor(config: any, text?: string, style?: any);
        text: string;
        config: any;
        style: PIXI.TextStyle;
        align: string;
        dispose(): void;
        protected fitToBounds(): void;
        protected positionText(): void;
        protected drawDebugRect(): void;
    }
    class TextConfig extends Pluck.External {
        bounds: any;
        align: string;
        verticalAlign: string;
        shouldScale: boolean;
        minFontSize: number;
        debug: boolean;
    }
}
