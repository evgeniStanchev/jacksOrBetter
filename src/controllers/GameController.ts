///<reference path="../views/GameView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="./CardsController.ts"/>
///<reference path="./ButtonsController.ts"/>
///<reference path="./BalanceController.ts"/>
///<reference path="./WinController.ts"/>
///<reference path="./GambleButtonController.ts"/>
///<reference path="./ActionController.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../server/Server.ts"/>

namespace controllers {
    import GameView = views.GameView;
    import Notifications = poker.Notifications;
    import GameModel = model.GameModel;
    import WinController = controllers.WinController;
    import ActionController = controllers.ActionController;
    import Main = poker.Main;

    import GambleButtonController = controllers.GambleButtonController;
    import CardsController = controllers.CardsController;
    import ButtonsController = controllers.ButtonsController;
    import BalanceController = controllers.BalanceController;
    import Server = server.Server;

    export class GameController extends Pluck.ViewController {
        public static readonly WIDTH = 1280;
        public static readonly HEIGHT = 720;

        private _app: PIXI.Application;
        private _cardsController: CardsController;
        private _buttonsController: ButtonsController;
        private _balanceController: BalanceController;
        private _winController: WinController;
        private _actionController: ActionController;
        private _gambleButtonController: GambleButtonController;
        private _server : Server;

        constructor(facade:Main) {
            super(new GameView(), new GameModel());
            this.mModel.facade=facade;
            this._server = new Server(5000);
            this.mModel.facade.on("draw", this.requestDraw, this);
            this.init();
        }

        set data(val) {
            this.mModel.data = val;
        }

        private get mModel(): GameModel {
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
            this._actionController = new ActionController();
            this.addChildViewController(this._actionController);
        }

      private requestDraw():void{
        // this._server.request
      }

    }
}
