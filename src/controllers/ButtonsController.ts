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
            this._view.on("end", this.onEnd, this);
        }

        private onButtonDraw(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_DRAW);
            this.sendNotification(Notification.BUTTON_CLICK_DRAW);
        }

        private onButtonDeal(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_DEAL);
            this.sendNotification(Notification.BUTTON_CLICK_DEAL);
        }
        private onButtonCollect(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_COLLECT);
            this.sendNotification(Notification.BUTTON_CLICK_COLLECT);
        }

        private onEnd(): void {
            console.log("ends");
            // this.sendNotification(Notification.END);
        }
    }
}
