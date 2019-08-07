///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
///<reference path="Notifications.ts"/>
namespace poker {
    import GameController = controllers.GameController;
    import Resources = model.Resources;
    import Notification = poker.Notifications;

    export class Main extends PIXI.utils.EventEmitter {
        static REQUEST_DEAL = "requestBet";
        static REQUEST_DRAW = "requestDraw";
        static REQUEST_COLLECT = "requestCollect";

        private _res: Resources;
        private _rootController: GameController;

        constructor() {
            super();
            this._res = new Resources();
            this._res.load();
            this._res.on(Notification.RESOURCES_LOADED, this.onResourcesLoaded, this);
        }

        onResourcesLoaded(): void {
            this._rootController = new GameController();
            Pluck.ViewController.setRoot(this._rootController);
            this._rootController.addControllers();
        }

        requestDeal(): void {
            this.emit(Main.REQUEST_DEAL, {
                bet: 1000,
            });
        }

        requestDraw(): void {
            this.emit(Main.REQUEST_DRAW, {
                bet: 1000,
            });
        }

        set data(val: any) {
            this._rootController.data = val;
        }
    }
}
