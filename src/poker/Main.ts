///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
namespace poker {
    import GameController = poker.controllers.GameController;
    import Resources = poker.model.Resources;

    export class Main {
        private _res: Resources;

        constructor() {
            this._res = new Resources();
            this._res.load();
            new GameController();
        }
    }
}
