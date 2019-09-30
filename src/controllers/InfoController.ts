///<reference path="../views/InfoView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>

namespace controllers {
  import InfoView = views.InfoView;
  import Notification = poker.Notifications;
  import GameModel = model.GameModel;
  export class InfoController extends Pluck.ViewController {
    constructor() {
      super(new InfoView());
    }

    public getInterests(): string[] {
      return [
        Notification.CARDS_REVEAL_STARTED,
        Notification.CARDS_REVEAL_ENDED,
        Notification.COLLECTING,
        Notification.COLLECTING_SUCCESSFUL
      ];
    }

    public get gameModel(): GameModel {
      return (Pluck.ViewController.root as any)._model;
    }

    public handleNotification(notification: Pluck.Notification): void {
      console.log("Notification received: " + notification.name);
      switch (notification.name) {
        case Notification.CARDS_REVEAL_STARTED: {
          this._view.changeText("GOOD LUCK!");
          break;
        }
        case Notification.CARDS_REVEAL_ENDED: {
          if (this.gameModel.state == "Deal") {
            this._view.changeText("SELECT CARDS TO HOLD");
          }
          break;
        }
        case Notification.COLLECTING: {
          this._view.changeText(this.gameModel.lastWinCombination);
          break;
        }
        case Notification.COLLECTING_SUCCESSFUL: {
          this._view.changeText("PRESS DEAL TO RUN NEW GAME");
          break;
        }
      }
    }
  }
}
