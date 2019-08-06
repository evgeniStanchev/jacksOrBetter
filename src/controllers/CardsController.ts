///<reference path="../views/CardsView.ts"/>
///<reference path="../Notifications.ts"/>
namespace controllers {
    import CardsView = views.CardsView;
    import GameModel = model.GameModel;
    import Card = views.Card;
    import Notification = poker.Notifications;

    export class CardsController extends Pluck.ViewController {
        constructor() {
            super(new CardsView());

            // for (const card of this.view.cards) {
            //     card.on("click", this.onCardClick, this);
            // }

            // const mModel = this.gameModel;
            // console.log(mModel);
        }

        getInterests(): string[] {
            return [
                Notification.BUTTON_CLICK_DEAL,
                Notification.BUTTON_CLICK_DRAW,
                Notification.BUTTON_CLICK_COLLECT,
                // Notification.END,
            ];
        }

        handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
                case Notification.BUTTON_CLICK_DEAL: {
                    this.view.hideCards();
                    this.view.setNewRanksAndSuits();
                    this.view.revealCards();
                    break;
                }
                // case Notification.END: {
                //     break;
                // }
            }
        }

        get view(): CardsView {
            return this._view;
        }

        get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        private onCardClick(e: PIXI.interaction.InteractionEvent) {
            //
            const card = e.target as Card;

            this.gameModel.facade.requestDraw();

            if (this.gameModel.balance > 0) {
                card.hold();
            }
        }
    }
}
