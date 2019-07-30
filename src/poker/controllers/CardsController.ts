///<reference path="../views/cards/CardsView.ts"/>
namespace poker.controllers {
    import CardsView = poker.views.cards.CardsView;
    import GameModel = poker.model.GameModel;
    import Card = poker.views.cards.Card;

    export class CardsController extends Pluck.ViewController {
        constructor() {
            super(new CardsView());

            for (const card of this.view.cards) {
                card.on("click", this.onCardClick, this);
            }
        }

        getInterests(): string[] {
            return [];
        }

        handleNotification(notification: Pluck.Notification): void {
            switch (notification.name) {
                case Notifications.DEAL_RECEIVED: {
                    const heldCardsIndexes : number[] = this.view.heldCards();

                    this.view.revealCards();
                    break;
                }
            }
        }

        get view(): CardsView {
            return this._view;
        }

        get gameModel(): GameModel {
            return Pluck.ViewController.controllerMap["GameController"].model;
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
