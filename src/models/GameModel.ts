///<reference path="../Main.ts"/>

namespace model {
    import Main = poker.Main;

    export class GameModel extends Pluck.Model {
        public balance: number = 50000;
        public cards: number[];
        public state: string;
        public bet: number[];

        public facade: Main;

        isShowingCredits: boolean;

        constructor() {
            super();
        }

        changeCurrency(): void {
            this.isShowingCredits = !this.isShowingCredits;

            this.sendNotification("currencyChanged");
        }

        set data(val) {
            this.balance = val.balance;

            switch (val.state) {
                case "deal":
                    this.sendNotification("dealReceived");
                    break;
            }
        }
    }
}
