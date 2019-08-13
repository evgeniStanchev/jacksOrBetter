///<reference path="../types/state.ts"/>
///<reference path="../Main.ts"/>

namespace server {
    import Main = poker.Main;
    import state = poker.state;

    export class Server {
        private readonly _requestDeal = "requestDeal";
        private readonly _requestCollect = "requestCollect";
        private readonly _endTheSpin = "endTheSpin";
        private readonly _resourceLoaded = "resources loaded";
        private _facade: Main;
        private _state: state;
        private _balance: number;

        constructor(facade: Main, balance: number) {
            this._balance = balance;
            this._facade = facade;
            this._state = "Deal";
            this._facade.on(this._requestDeal, this.requestDeal, this);
            this._facade.on(this._requestCollect, this.requestCollect, this);
            this._facade.on(this._endTheSpin, this.endTheSpin, this);
            this._facade.on(this._resourceLoaded, this.setBalance, this);
        }

        public endTheSpin(): void {
            if (this._state == "Draw" || this._state == "Collect") {
                this._facade.data = {
                    action: "end the game",
                    amount: 0,
                };
                this.changeState("Deal");
            } else {
                console.error("You must be in Collect or Draw state");
            }
        }

        public requestDeal(request: { bet: number }) {
            if (this._state == "Deal") {
                if (this._balance >= request.bet) {
                    this._balance -= request.bet;
                    this._facade.data = {
                        action: this._state,
                        amount: this._balance,
                    };
                    this.changeState("Draw");
                    console.log("Deal was successfull.");
                } else {
                    console.error("You dont have enough balance");
                }
            } else {
                console.error("To D You must be in Deal state. Your state now is " + this._state);
            }
        }

        private setBalance(): void {
            const data = {
                action: "setBalance",
                amount: this._balance,
            };
            this._facade.data = data;
        }

        private changeState(newState: state) {
            this._state = newState;
        }

        public requestCollect(amount: number) {
            if (this._state == "Collect") {
                this._balance += amount;
                this._state = "Collect";
                console.log("Collecting ended successfully");
            } else {
                console.error("To Collect You must be in Collect state. Your state now is " + this._state);
            }
        }
    }
}
