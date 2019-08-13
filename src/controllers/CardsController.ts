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

        public getInterests(): string[] {
            return [
                Notification.BUTTON_CLICK_DEAL,
                Notification.BUTTON_CLICK_DRAW,
                Notification.BUTTON_CLICK_COLLECT,
                Notification.DEAL_SUCCESSFUL,
            ];
        }

        public handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
                case Notification.DEAL_SUCCESSFUL: {
                    this.view.hideCards();
                    this.view.setNewRanksAndSuits();
                    this.view.revealCards();
                    this.view.startInteractivity();
                    break;
                }
                case Notification.BUTTON_CLICK_DRAW: {
                    this.view.hideCards();
                    this.view.setNewRanksAndSuits();
                    this.view.revealCards();
                    this.view.stopInteractivity();
                    this.view.releaseAllCards();
                    if (true) {
                        this.gameModel.facade.endTheSpin();
                    } else {
                        //
                    }
                    break;
                }
            }
        }



        public get view(): CardsView {
            return this._view;
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        private onCardClick(e: PIXI.interaction.InteractionEvent) {
            //
            const card = e.target as Card;

            this.gameModel.facade.requestDeal(200);

            if (this.gameModel.balance > 0) {
                card.hold();
            }
        }
    }
}
