///<reference path="../views/PriceBoardView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
namespace controllers {
    import PriceBoardView = views.PriceBoardView;
    import Notification = poker.Notifications;
    import GameModel = model.GameModel;

    export class PriceBoardController extends Pluck.ViewController {

        constructor() {
            super(new PriceBoardView());
        }

        getInterests(): string[] {
            return [];
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        handleNotification(notification: Pluck.Notification): void {
          
        }

    }
}
