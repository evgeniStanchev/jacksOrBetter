///<reference path="../views/BalanceView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
namespace controllers {
    import BalanceView = views.BalanceView;
    import Notification = poker.Notifications;
    import GameModel = model.GameModel;

    export class BalanceController extends Pluck.ViewController {
        private _mModel: GameModel;

        constructor(mModel: GameModel) {
            //TODO balance must be received from server
            super(new BalanceView());
            this._mModel = mModel;
        }

        getInterests(): string[] {
            return [Notification.DEAL_SUCCESSFUL, Notification.BALANCE_INIT, Notification.COLLECTING];
        }

        handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
                case Notification.BALANCE_INIT: {
                    this._view.initializeBalance(this._mModel.balance);
                    break;
                }
                case Notification.DEAL_SUCCESSFUL: {
                    this._view.changeBalance(this._mModel.balance);
                    break;
                }
               
            }
        }
    }
}
