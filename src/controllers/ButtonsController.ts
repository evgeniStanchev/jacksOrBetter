///<reference path="../views/BetButtonsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../views/BetButton.ts"/>
///<reference path="../models/GameModel.ts"/>
///<reference path="../types/action.ts"/>
///<reference path="../types/listening.ts"/>
///<reference path="../types/state.ts"/>

namespace controllers {
    import Notification = poker.Notifications;
    import BetButtonsView = views.BetButtonsView;
    import BetButton = views.BetButton;
    import GameModel = model.GameModel;
    import Action = poker.action;
    import state = poker.state;
    import listening = poker.listening;

    export class ButtonsController extends Pluck.ViewController {
        private _currentAction: Action;

        constructor() {
            super(new BetButtonsView([1, 2, 3, 5, 10]));
            this._currentAction = "deal clicked";
            this.listening("on");
        }

        public get view(): BetButtonsView {
            return this._view;
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        public getInterests(): string[] {
            return [Notification.DEAL_SUCCESSFUL, Notification.COLLECTING, Notification.COLLECTING_SUCCESSFUL];
        }

        public handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notification.DEAL_SUCCESSFUL: {
                    this._currentAction = "draw clicked";
                    this.updateActionLabel("Draw");
                    // this._view.
                    break;
                }
                case Notification.COLLECTING: {
                    this._currentAction = "collect clicked";
                    this.updateActionLabel("Collect");
                    break;
                }
                case Notification.COLLECTING_SUCCESSFUL: {
                    this._currentAction = "deal clicked";
                    this.updateActionLabel("Deal");
                    break;
                }
            }
        }

        private onButtonClicked(e: PIXI.interaction.InteractionEvent): void {
            const selectedButton = e.target as BetButton;
            switch (this._currentAction) {
                case "deal clicked": {
                    this.gameModel.facade.requestDeal(selectedButton.betValue);
                    this.sendNotification(Notification.BUTTON_CLICK_DEAL);
                    break;
                }
                case "draw clicked": {
                    this.sendNotification(Notification.BUTTON_CLICK_DRAW);
                    break;
                }
                case "collect clicked": {
                    this.sendNotification(Notification.BUTTON_CLICK_COLLECT);
                    break;
                }
            }
        }

        private listening(method: listening): void {
            for (const button of this._view.buttons) {
                button[method]("buttonSelected", this.selectButton, this);
                button[method]("click", this.onButtonClicked, this);
            }
        }

        private selectButton(buttonIndex: number): void {
            for (const button of this._view.buttons) {
                if (this._view.buttons.indexOf(button) == buttonIndex) {
                    button.selectButton();
                } else {
                    if (button.isSelected) {
                        button.deselectButton();
                    }
                }
            }
        }

        public updateActionLabel(newLabel: state) {
            for (const button of this._view.buttons) {
                if (!button.isMaxBet) {
                    button.actionLabelText = newLabel;
                }
            }
        }
    }
}
