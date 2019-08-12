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
            super(new BalanceView(300));
            this._mModel = mModel;
        }

        getInterests(): string[] {
            return [Notification.BALANCE_UPDATED, Notification.DEAL_SUCCESSFUL];
        }

        handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notification.BALANCE_UPDATED: {
                    this._view.changeBalance(this._mModel.balance);
                    break;
                }
                case Notification.DEAL_SUCCESSFUL: {
                    this._view.changeBalance(this._mModel.balance);
                    break;
                }
                // case Notification.END: {
                //     break;
                // }
            }
        }
    }
}
