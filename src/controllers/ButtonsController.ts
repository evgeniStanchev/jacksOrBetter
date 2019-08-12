///<reference path="../views/BetButtonsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../views/BetButton.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="../types/action.ts"/>

namespace controllers {
    import Notification = poker.Notifications;
    import BetButtonsView = views.BetButtonsView;
    import BetButton = views.BetButton;
    import GameModel = model.GameModel;
    import Action = poker.action;

    export class ButtonsController extends Pluck.ViewController {

        private _currentAction: Action;

        constructor() {
            super(new BetButtonsView());
            this._currentAction = "deal clicked";
            this._view.on("buttonClicked", this.onButtonClicked, this);
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
                    console.log("Deal ? ")
                    this._currentAction = "draw clicked";
                    this._view.updateAction("Draw");
                    // this._view.
                    break;
                }
            }
        }

        private onButtonClicked(selectedButton :BetButton): void{
            switch(this._currentAction){
                case("draw clicked"):{
                    this.onButtonDrawClicked();
                    break;
                }
                case("deal clicked"):{
                    this.onButtonDealClicked(selectedButton);
                    break;
                }
                case("collect clicked"):{
                    this.onButtonCollectClicked();
                    break;
                }
            }
        }

        private onButtonDrawClicked(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_DRAW);
            this.sendNotification(Notification.BUTTON_CLICK_DRAW);
        }

        private onButtonDealClicked(selectedButton: BetButton): void {
            this.gameModel.facade.requestDraw(selectedButton.betValue);
            console.log("sending notification:", Notification.BUTTON_CLICK_DEAL);
            this.sendNotification(Notification.BUTTON_CLICK_DEAL);
        }

        private onButtonCollectClicked(): void {
            console.log("sending notification:", Notification.BUTTON_CLICK_COLLECT);
            this.sendNotification(Notification.BUTTON_CLICK_COLLECT);
        }
    }
}
