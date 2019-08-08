///<reference path="../views/BetButtonsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../views/BetButton.ts"/>
///<reference path="../models/GameModel.ts"/>

namespace controllers {
    import Notification = poker.Notifications;
    import BetButtonsView = views.BetButtonsView;
    import BetButton = views.BetButton;
    import GameModel = model.GameModel;

    export class ButtonsController extends Pluck.ViewController {

        constructor() {
            super(new BetButtonsView());
            this._view.on("draw clicked", this.onButtonDraw, this);
            this._view.on("deal clicked", this.onButtonDeal, this);
            this._view.on("collect clicked", this.onButtonCollect, this);
        }

        get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        getInterests(): string[] {
            return [Notification.DEAL_SUCCESSFUL];
        }

        handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notification.DEAL_SUCCESSFUL: {
                    this._view.changeBalance();
                }
            }
        }

        private onButtonDraw(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_DRAW);
            this.sendNotification(Notification.BUTTON_CLICK_DRAW);
        }

        private onButtonDeal(selectedButton: BetButton): void {
           
            this.gameModel.facade.requestDeal(selectedButton.betValue);
            console.log("sending notification:", Notification.BUTTON_CLICK_DEAL);
            this.sendNotification(Notification.BUTTON_CLICK_DEAL);
        }

        private onButtonCollect(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_COLLECT);
            this.sendNotification(Notification.BUTTON_CLICK_COLLECT);
        }
    }
}
