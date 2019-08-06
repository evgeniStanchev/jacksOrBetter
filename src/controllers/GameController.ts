///<reference path="../views/GameView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="./CardsController.ts"/>
///<reference path="./ButtonsController.ts"/>

namespace controllers {
    import GameView = views.GameView;
    import Notifications = poker.Notifications;
    import GameModel = model.GameModel;
    import CardsController = controllers.CardsController;
    import ButtonsController = controllers.ButtonsController;

    export class GameController extends Pluck.ViewController {
        public static readonly WIDTH = 1280;
        public static readonly HEIGHT = 720;

        private _app: PIXI.Application;
        private _cardsController: CardsController;
        private _buttonsController: ButtonsController;

        constructor() {
            super(new GameView(), new GameModel());
            this.init();
        }

        set data(val) {
            this.mModel.data = val;
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
            return [Notifications.RESOURCES_LOADED];
        }

        public handleNotification(note: Pluck.Notification) {
            switch (
                note.name
                // case Notifications.RESOURCES_LOADED:
                //     this.addControllers();
                //     break;
            ) {
            }
        }

        public addControllers(): void {
            this._cardsController = new CardsController();
            this.addChildViewController(this._cardsController);
            this._buttonsController = new ButtonsController();
            this.addChildViewController(this._buttonsController);
        }

        private get mModel(): GameModel {
            return this._model as GameModel;
        }
    }
}
