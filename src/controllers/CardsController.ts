///<reference path="../views/CardsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../Message.ts"/>

namespace controllers {
  import CardsView = views.CardsView;
  import GameModel = model.GameModel;
  import Card = views.Card;
  import Notification = poker.Notifications;
  import Message = poker.Message;

  export class CardsController extends Pluck.ViewController {
    constructor() {
      super(new CardsView());
      this._view.on(
        Message.cardsStartReveiling,
        this.notifyCardsRevealingStarted,
        this
      );
      this._view.on(
        Message.cardsEndReveiling,
        this.notifyCardsRevealingEnded,
        this
      );
      this._view.on(Message.cardsEndReveiling, this.setWinningCards, this);
    }

    public getInterests(): string[] {
      return [
        Notification.BUTTON_CLICK_DRAW,
        Notification.BUTTON_CLICK_COLLECT,
        Notification.DEAL_SUCCESSFUL,
        Notification.DRAW_SUCCESSFUL
      ];
    }

    public handleNotification(notification: Pluck.Notification): void {
      console.log("Notification received: " + notification.name);
      switch (notification.name) {
        case Notification.DEAL_SUCCESSFUL: {
          this.view.hideCards();
          this.view.setCardsRanksAndSuits(this.gameModel.cards);
          this.view.revealCards();
          this.view.startInteractivity();
          break;
        }
        case Notification.DRAW_SUCCESSFUL: {
          this.view.hideCards();
          this.view.setCardsRanksAndSuits(this.gameModel.cards);
          this.view.revealCards();
          this.view.stopInteractivity();
          this.view.releaseAllCards();
          this.gameModel.facade.requestCollect();
          break;
        }
        case Notification.BUTTON_CLICK_DRAW: {
          this.view.hideCards();
          this.gameModel.facade.requestDraw(this.view.getUnholdedCardIndexes());
        }
      }
    }

    public get gameModel(): GameModel {
      return (Pluck.ViewController.root as any)._model;
    }

    public get view(): CardsView {
      return this._view;
    }

    private notifyCardsRevealingStarted(): void {
      this.sendNotification(Notification.CARDS_REVEAL_STARTED);
    }

    private setWinningCards(): void {
      if (this.gameModel.state == "Collect") {
        this.view.setWinningCards(this.gameModel.lastWinCardsIndexes);
      }
    }

    private notifyCardsRevealingEnded(): void {
      this.sendNotification(Notification.CARDS_REVEAL_ENDED);
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
