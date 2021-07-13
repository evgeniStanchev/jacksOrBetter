///<reference path="./controllers/GameController.ts"/>
///<reference path="models/Resources.ts"/>
///<reference path="Notifications.ts"/>
///<reference path="./types/combination.ts"/>
namespace poker {
  import GameController = controllers.GameController;
  import Resources = model.Resources;
  import Notification = poker.Notifications;
  import combination = poker.combination;

  export class Main extends PIXI.utils.EventEmitter {
    private readonly _res: Resources;
    private readonly _requestDeal = "requestDeal";
    private readonly _requestDraw = "requestDraw";
    private readonly _requestCollect = "requestCollect";
    private readonly _requestRestart = "requestRestart";

    private _rootController: GameController;
//3
    constructor() {
      super();
      this._res = new Resources();
      this._res.load();
      this._res.on(Notification.RESOURCES_LOADED, this.onResourcesLoaded, this);
    }

    set data(val: {
      state?: state;
      balance?: number;
      cards?: number[];
      winCardsIndexes?: number[];
      winAmount?: number;
      winCombination?: combination;
    }) {
      this._rootController.data = val;
    }

    private onResourcesLoaded(): void {
      this._rootController = new GameController(this);
      Pluck.ViewController.setRoot(this._rootController);
      this._rootController.addControllers();
      this.emit("resources loaded");
    }

    public requestDeal(bet: number): void {
      this.emit(this._requestDeal, {
        bet: bet
      });
    }

    public requestDraw(indexes: number[]): void {
      console.log(indexes);
      this.emit(this._requestDraw, indexes);
    }

    public requestRestart(): void {
      this.emit(this._requestRestart);
    }

    public requestCollect(): void {
      this.emit(this._requestCollect);
    }
  }
}
