///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
namespace poker {
    import GameController = controllers.GameController;
    import Resources = model.Resources;

    export class Main {
        private _res: Resources;

        constructor() {
            //  this._res = new Resources();
            //  this._res.load();
            const a = 5;
            const root = new GameController();

            Pluck.ViewController.setRoot(root);
            root.addControllers();
        }
    }
}
