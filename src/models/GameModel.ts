///<reference path="../Main.ts"/>
///<reference path="../Notifications.ts"/>
///<reference path="../views/Card.ts"/>
///<reference path="../types/state.ts"/>
namespace model {
    import Main = poker.Main;
    import Notification = poker.Notifications;
    import Card = views.Card;
    import state = poker.state;

    export class GameModel extends Pluck.Model {
        private _balance: number;
        private _cards: Card[];
        private _state: state;
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

        public get cards(): Card[] {
            return this._cards;
        }

        public get state(): string {
            return this._state;
        }

        public changeCurrency(): void {
            this._isShowingCredits = !this._isShowingCredits;
            this.sendNotification(Notification.CURRENCY_CHANGED);
        }

        set data(val: { state?: state; balance?: number; cards?: Card[] }) {
            this._balance = val.balance;
            this._cards = val.cards;
            this._state = val.state;

            switch (val.state) {
                case ("Deal"): {
                    this.sendNotification(Notification.DEAL_SUCCESSFUL);
                    break;
                }
                
                case("Draw"):{
                    this.sendNotification(Notification.DRAW_SUCCESSFUL);
                    this._facade.requestRestart();
                    break;
                }

                case "SpinEnd": {
                    this.sendNotification(Notification.SPIN_ENDED);
                    break;
                } 
                default:{
                    this.sendNotification(Notification.BALANCE_UPDATED);
                    break;
                }
            }
        }
    }
}
