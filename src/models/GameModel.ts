///<reference path="../Main.ts"/>
///<reference path="../Notifications.ts"/>
namespace model {
    import Main = poker.Main;
    import Notification = poker.Notifications;

    export class GameModel extends Pluck.Model {
        private _balance: number;
        private _cards: number[];
        private _state: string;
        private _facade: Main;
        private _isShowingCredits: boolean;

        constructor() {
            super();
        }

        public get facade(): Main {
            return this._facade;
        }

        public set facade(v: Main) {
            this._facade = v;
        }

        public get balance(): number {
            return this._balance;
        }

        public get cards(): number[] {
            return this._cards;
        }

        public get state(): string {
            return this._state;
        }

        public changeCurrency(): void {
            this._isShowingCredits = !this._isShowingCredits;
            this.sendNotification(Notification.CURRENCY_CHANGED);
        }

        set data(val: { action: string; amount: number }) {
            this._balance = val.amount;
            // this._cards = val.cards;

            switch (val.action) {
                case "draw": {
                    this.sendNotification(Notification.DEAL_SUCCESSFUL);
                    break;
                }
                case "setBalance": {
                    this.sendNotification(Notification.BALANCE_UPDATED);
                }
            }
        }
    }
}
