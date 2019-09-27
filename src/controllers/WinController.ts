///<reference path="../views/WinView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>

namespace controllers {
    import WinView = views.WinView;
    import Notification = poker.Notifications;
    import GameModel = model.GameModel;

    export class WinController extends Pluck.ViewController {
        private _collectingEnded = "Collecting ended";
        constructor() {
            super(new WinView());
            this._view.on(this._collectingEnded, this.notifyCollectingEnd , this);
        }

        getInterests(): string[] {
            return [Notification.COLLECTING, Notification.BUTTON_CLICK_COLLECT];
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
                case Notification.COLLECTING: {
                    this._view.changeLastWinSequentially(this.gameModel.lastWin);
                    break;
                }
                case Notification.BUTTON_CLICK_COLLECT:{
                    this._view.buttonCollectClicked();
                    this._view.changeLastWin(this.gameModel.lastWin);
                    break;
                }
            }
        }

        private notifyCollectingEnd(){
            this.sendNotification(Notification.COLLECTING_SUCCESSFUL)
        }
    }
}
