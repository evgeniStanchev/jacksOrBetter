///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
///<reference path="Notifications.ts"/>
namespace poker {
    import GameController = controllers.GameController;
    import Resources = model.Resources;
    import Notification = poker.Notifications;

    export class Main extends PIXI.utils.EventEmitter {
        private readonly _res: Resources;
        private _rootController: GameController;

        private readonly _requestDraw = "requestDraw";
        private readonly _requestCollect = "requestCollect";

        constructor() {
            super();
            this._res = new Resources();
            this._res.load();
            this._res.on(Notification.RESOURCES_LOADED, this.onResourcesLoaded, this);
        }
        
        public set data(val: { action: string; amount: number }) {
            this._rootController.data = val;
        }

        private onResourcesLoaded(): void {
            this._rootController = new GameController(this);
            Pluck.ViewController.setRoot(this._rootController);
            this._rootController.addControllers();
            this.emit("resources loaded");
        }

        public changeState(): void {}

        public requestDraw(bet: number): void {
            this.emit(this._requestDraw, {
                bet: bet,
            });
        }

        public requestCollect(amount: number): void {
            this.emit(this._requestCollect, {
                amount: amount,
            });
        }

    }
}
