///<reference path="../views/BalanceView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
namespace controllers {
    import BalanceView = views.BalanceView;
    import Notification = poker.Notifications;
    import GameModel = model.GameModel;

    export class BalanceController extends Pluck.ViewController {
      

        constructor() {
            //TODO balance must be received from server
            super(new BalanceView());
          
        }

        getInterests(): string[] {
            return [Notification.DEAL_SUCCESSFUL, Notification.BALANCE_INIT];
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
                case Notification.BALANCE_INIT: {
                    this._view.initializeBalance(this.gameModel.balance);
                    break;
                }
                case Notification.DEAL_SUCCESSFUL: {
                    this._view.changeBalance(this.gameModel.balance);
                    break;
                }
            }
        }
    }
}
