///<reference path="../views/GameView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="./CardsController.ts"/>
///<reference path="./ButtonsController.ts"/>
///<reference path="./BalanceController.ts"/>
///<reference path="./PriceBoardController.ts"/>
///<reference path="./WinController.ts"/>
///<reference path="./OptionsController.ts"/>
///<reference path="./GambleButtonController.ts"/>
///<reference path="./InfoController.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../types/state.ts"/>
///<reference path="../types/combination.ts"/>

namespace controllers {
    import GameView = views.GameView;
    import Notifications = poker.Notifications;
    import GameModel = model.GameModel;
    import WinController = controllers.WinController;
    import OptionsController = controllers.OptionsController;
    import InfoController = controllers.InfoController;
    import Main = poker.Main;
    import state = poker.state;
    import GambleButtonController = controllers.GambleButtonController;
    import CardsController = controllers.CardsController;
    import ButtonsController = controllers.ButtonsController;
    import BalanceController = controllers.BalanceController;
    import PriceBoardController = controllers.PriceBoardController;
    import combination = poker.combination;
    export class GameController extends Pluck.ViewController {
        public static readonly WIDTH = 1280;
        public static readonly HEIGHT = 720;

        private _app: PIXI.Application;
        private _cardsController: CardsController;
        private _buttonsController: ButtonsController;
        private _balanceController: BalanceController;
        private _winController: WinController;
        private _infoController: InfoController;
        private _priceBoardController: PriceBoardController;
        private _gambleButtonController: GambleButtonController;
        private _optionsController: OptionsController;

        constructor(facade: Main) {
            super(new GameView(), new GameModel());
            this.mModel.facade = facade;
            this.init();
        }

        set data(val: {
            state?: state;
            balance?: number;
            cards?: number[];
            winCardsIndexes?: number[];
            winAmount?: number;
            lastWinCombination?: combination;
        }) {
            this.mModel.data = val;
        }

        public get mModel(): GameModel {
            return this._model as GameModel;
        }

        private init(): void {
            this._app = new PIXI.Application({
                width: 1280,
                height: 720,
            });
            this._app.stage.addChild(this._view);
            document.getElementById("display-port").appendChild(this._app.view);
        }

        public getInterests(): string[] {
            return [Notifications.BUTTON_CLICK_DEAL];
        }

        public handleNotification(note: Pluck.Notification) {
            switch (note.name) {
                case Notifications.BUTTON_CLICK_DEAL: {
                }
            }
        }

        public addControllers(): void {
            this._cardsController = new CardsController();
            this.addChildViewController(this._cardsController);
            this._buttonsController = new ButtonsController();
            this.addChildViewController(this._buttonsController);
            this._balanceController = new BalanceController();
            this.addChildViewController(this._balanceController);
            this._winController = new WinController();
            this.addChildViewController(this._winController);
            this._gambleButtonController = new GambleButtonController();
            this.addChildViewController(this._gambleButtonController);
            this._infoController = new InfoController();
            this.addChildViewController(this._infoController);
            this._priceBoardController = new PriceBoardController();
            this.addChildViewController(this._priceBoardController);
            this._optionsController = new OptionsController();
            this.addChildViewController(this._optionsController);
        }
    }
}
