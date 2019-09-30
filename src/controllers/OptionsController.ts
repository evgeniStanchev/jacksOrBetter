///<reference path="../views/OptionsView.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../models/GameModel.ts"/>
namespace controllers {
    import OptionsView = views.OptionsView;
    import Notification = poker.Notifications;
    import GameModel = model.GameModel;

    export class OptionsController extends Pluck.ViewController {
        constructor() {
            //TODO balance must be received from server
            super(new OptionsView());
        }

        getInterests(): string[] {
            return [];
        }

        public get gameModel(): GameModel {
            return (Pluck.ViewController.root as any)._model;
        }

        handleNotification(notification: Pluck.Notification): void {
            console.log("Notification received: " + notification.name);
            switch (notification.name) {
            }
        }
    }
}
