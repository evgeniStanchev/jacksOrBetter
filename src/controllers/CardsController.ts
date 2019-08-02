///<reference path="../views/CardsView.ts"/>
///<reference path="../Notifications.ts"/>
namespace controllers {
    import CardsView = views.CardsView;
    import GameModel = model.GameModel;
    import Card = views.Card;
    import Notifications = poker.Notifications;

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
            return [];
        }

        handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notifications.DEAL_RECEIVED: {
                    this.view.revealCards();
                    break;
                }
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

            if (this.gameModel.balance > 0) {
                card.hold();
            }
        }
    }
}
