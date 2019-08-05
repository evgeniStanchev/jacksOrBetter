///<reference path="../views/BetButtonsView.ts"/>
///<reference path="../Notifications.ts"/>
namespace controllers {
    import Notification = poker.Notifications;
    import BetButtonsView = views.BetButtonsView;
    export class ButtonsController extends Pluck.ViewController {
        constructor() {
            super(new BetButtonsView());
            this._view.on("draw", this.onButtonDraw, this);
            this._view.on("deal", this.onButtonDeal, this);
            this._view.on("collect", this.onButtonCollect, this);
        }

        private onButtonDraw(): void {
            console.log("sending notification:", Notification.DRAW);
            this.sendNotification(Notification.DRAW, 0);
        }

        private onButtonDeal(): void {
            console.log("sending notification:", Notification.DEAL);
            this.sendNotification(Notification.DEAL, 0);
        }
        private onButtonCollect(): void {
            console.log("sending notification:", Notification.COLLECT);
            this.sendNotification(Notification.COLLECT, 0);
        }
    }
}
