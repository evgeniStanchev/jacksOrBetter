///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
namespace poker {
    import GameController = controllers.GameController;
    import Resources = model.Resources;

    export class Main extends PIXI.utils.EventEmitter {
        static REQUEST_DEAL = "requestBet";
        static REQUEST_DRAW = "requestDraw";
        static REQUEST_COLLECT = "requestCollect";

        private _res: Resources;
        private _rootController: GameController;
        constructor() {
            super();
            //  this._res = new Resources();
            //  this._res.load();
            const a = 5;
            const root = new GameController();

            Pluck.ViewController.setRoot(root);
            root.addControllers();
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

        set data(val) {
            this._rootController.data = val;
        }
    }
}
