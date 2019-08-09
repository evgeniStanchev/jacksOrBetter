///<reference path="../views/BetButtonsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../views/BetButton.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="../server/Request.ts"/>

namespace controllers {
    import Notification = poker.Notifications;
    import BetButtonsView = views.BetButtonsView;
    import BetButton = views.BetButton;
    import GameModel = model.GameModel;
    import Request = server.Request;

    export class ButtonsController extends Pluck.ViewController {
        constructor() {
            super(new BetButtonsView());
            this._view.on("deal clicked", this.onButtonDealClicked, this);
            this._view.on("draw clicked", this.onButtonDrawClicked, this);
            this._view.on("collect clicked", this.onButtonCollectClicked, this);
        }

        public get view(): BetButtonsView {
            return this._view;
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        public getInterests(): string[] {
            return [Notification.DEAL_SUCCESSFUL];
        }

        public handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notification.DEAL_SUCCESSFUL: {
                    this._view.changeBalance();
                }
            }
        }

        private onButtonDrawClicked(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_DRAW);
            this.sendNotification(Notification.BUTTON_CLICK_DRAW);
        }

        private onButtonDealClicked(selectedButton: BetButton): void {
            const request = new Request();
            this.gameModel.facade.requestDeal(request);
            console.log("sending notification:", Notification.BUTTON_CLICK_DEAL);
            this.sendNotification(Notification.BUTTON_CLICK_DEAL);
        }

        private onButtonCollectClicked(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_COLLECT);
            this.sendNotification(Notification.BUTTON_CLICK_COLLECT);
        }
    }
}
