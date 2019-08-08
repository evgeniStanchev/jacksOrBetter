///<reference path="../Main.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../types/action.ts"/>

namespace model {
    import Main = poker.Main;
    import Notification = poker.Notifications;
    import Action = poker.action;

    export class GameModel extends Pluck.Model {
        public balance: number = 50000;
        public cards: number[];
        public state: string;
        public bet: number[];
        public facade: Main;
        public isShowingCredits: boolean;

        constructor() {
            super();
        }

        public changeCurrency(): void {
            this.isShowingCredits = !this.isShowingCredits;
            this.sendNotification(Notification.CURRENCY_CHANGED);
        }

        public requestDeal(bet: number): boolean {
            if (bet <= this.balance) {
                this.balance -= bet;
                return true;
            }
            return false;
        }

        set data(val: any) {
            this.balance = val.balance;
            this.bet = val.bet;
            this.cards = val.cards;

            switch (val.action) {
                case "draw": {
                    this.sendNotification("dealReceived");
                    break;
                }
            }
        }
    }
}
