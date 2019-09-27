///<reference path="../Main.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../types/state.ts"/>
namespace model {
    import Main = poker.Main;
    import Notification = poker.Notifications;
    import state = poker.state;

    export class GameModel extends Pluck.Model {
        private _lastWin: number;
        private _balance: number;
        private _cards: number[];
        private _state: state;
        private _facade: Main;
        private _isShowingCredits: boolean;

        constructor() {
            super();
        }

        public get lastWin(): number {
            return this._lastWin;
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

        set data(val: {
            state?: state;
            balance?: number;
            cards?: number[];
            winCardsIndexes?: number[];
            winAmount?: number;
        }) {
            //TODO u need to make a way to receive information about last win
            this._balance = val.balance;
            this._cards = val.cards;
            this._state = val.state;
            if (val.winAmount != null) {
                this._lastWin = val.winAmount;
            }

            switch (val.state) {
                case "Init": {
                    this.sendNotification(Notification.BALANCE_INIT);
                    break;
                }
                case "Deal": {
                    this.sendNotification(Notification.DEAL_SUCCESSFUL);
                    break;
                }
                case "Draw": {
                    this.sendNotification(Notification.DRAW_SUCCESSFUL);
                    break;
                }
                case "Collect": {
                    this.sendNotification(Notification.COLLECTING);
                    break;
                }
            }
        }
    }
}
