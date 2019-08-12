///<reference path="../State.ts"/>
///<reference path="../Main.ts"/>

namespace server {
    import Main = poker.Main;
    import State = poker.State;

    export class Server {
        private readonly _requestDraw = "requestDraw";
        private readonly _requestCollect = "requestCollect";
        private _facade: Main;
        private _state: State;
        private _balance: number;

        constructor(facade: Main, balance: number) {
            this._balance = balance;
            this._facade = facade;
            this._facade.on(this._requestDraw, this.requestDraw, this);
            this._facade.on(this._requestCollect, this.requestCollect, this);
            this._facade.on("resources loaded", () => {
                const data = {
                    action: "setBalance",
                    amount: balance,
                };
                this._facade.data = data;
            });
            this._state = State.DEAL;
        }

        public requestDraw(request: { bet: number }) {
            console.log(this._state);
            if (this._state == State.DEAL) {
                if (this._balance >= request.bet) {
                    this._balance -= request.bet;
                    this._facade.data = {
                        action: "draw",
                        amount: this._balance,
                    };
                    this._state = State.DRAW;
                    console.log("Draw was successfull.");
                } else {
                    console.error("You dont have enough balance");
                }
            } else {
                console.error("To draw You must be in DEAL state. Your state now is " + this._state);
            }
        }

        public requestCollect(amount: number) {
            if (this._state == State.COLLECT) {
                this._balance += amount;
                this._state = State.COLLECT;
                console.log("Collecting ended successfully");
            } else {
                console.error("To collect You must be in COLLECT state. Your state now is " + this._state);
            }
        }
    }
}
