///<reference path="../types/state.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../types/suit.ts"/>
///<reference path="../types/rank.ts"/>
///<reference path="../views/Card.ts"/>

namespace server {
    import Main = poker.Main;
    import state = poker.state;
    import Suit = poker.suit;
    import Rank = poker.rank;
    import Card = views.Card;

    export class Server {
        private readonly _requestDeal = "requestDeal";
        private readonly _requestDraw = "requestDraw";
        private readonly _requestCollect = "requestCollect";
        private readonly _requestRestart = "requestRestart";
        private readonly _resourceLoaded = "resources loaded";
        private readonly _facade: Main;
        private _state: state;
        private _balance: number;
        private _cards: Card[];

        constructor(facade: Main, balance: number) {
            this._cards = [];
            this._balance = balance;
            this._facade = facade;
            this._state = "Deal";
            this._facade.on(this._requestDeal, this.requestDeal, this);
            this._facade.on(this._requestDraw, this.requestDraw, this);
            this._facade.on(this._requestCollect, this.requestCollect, this);
            this._facade.on(this._requestRestart, this.requestRestart, this);
            this._facade.on(this._resourceLoaded, this.setBalance, this);
        }

        private requestDeal(request: { bet: number }) {
            if (this._state == "Deal") {
                if (this._balance >= request.bet) {
                    this.setRandomCards([0, 1, 2, 3, 4]);
                    this._balance -= request.bet;
                    this._facade.data = {
                        state: this._state,
                        balance: this._balance,
                        cards: this._cards,
                    };
                    this.changeState("Draw");
                    console.log("SERVER: Deal was successfull.");
                } else {
                    console.error("You dont have enough balance");
                }
            } else {
                console.error("To Deal You must be in Deal state. Your state now is " + this._state);
            }
        }

        private requestDraw(indexes: number[]) {
            if (this._state == "Draw") {
                this.setRandomCards(indexes);
                this._facade.data = {
                    state: this._state,
                    cards: this._cards,
                };
            } else {
                console.log("You cannot draw if your state is not Draw");
            }
            console.log("SERVER: Draw was successfull.");
        }

        private requestCollect(amount: number) {
            if (this._state == "Draw") {
                this._balance += amount;
                this._state = "Collect";
                console.log("Collecting ended successfully");
            } else {
                console.error("To Collect You must be in Collect state. Your state now is " + this._state);
            }
        }

        private requestRestart(): void {
            // if (this._state == "Deal") {
            //     console.error("You cannot end the spin in Deal state");
            // } else {
            //     this._facade.data = {
            //         state: this._state,
            //     };
            //     this.changeState("Deal");
            // }
        }

        private setRandomCards(indexes: number[]): void {
            for (const index of indexes) {
                const card = new Card();
                do {
                    card.setSuitAndRank(this.getRandomRank(), this.getRandomSuit());
                } while (this.cardExists(card));
                this._cards[index] = card;
            }
        }

        private setBalance(): void {
            const data = {
                balance: this._balance,
            };
            this._facade.data = data;
        }

        private changeState(newState: state) {
            this._state = newState;
        }

        private cardExists(card: Card): boolean {
            for (const currentCard of this._cards) {
                if (currentCard.rank == card.rank && currentCard.suit == card.suit && currentCard != card) {
                    return true;
                }
            }
            return false;
        }

        //TODO alternative
        private getRandomRank(): Rank {
            const num = Math.floor((Math.random() * 20) % 13) + 2;
            console.log(num);
            switch (num) {
                case 2: {
                    return "2";
                }
                case 3: {
                    return "3";
                }
                case 4: {
                    return "4";
                }
                case 5: {
                    return "5";
                }
                case 6: {
                    return "6";
                }
                case 7: {
                    return "7";
                }
                case 8: {
                    return "8";
                }
                case 9: {
                    return "9";
                }
                case 10: {
                    return "10";
                }
                case 11: {
                    return "J";
                }
                case 12: {
                    return "Q";
                }
                case 13: {
                    return "K";
                }
                case 14: {
                    return "A";
                }
            }
        }
        //TODO alternative
        private getRandomSuit(): Suit {
            const num = Math.floor(Math.random() * 10) % 4;
            switch (num) {
                case 0: {
                    return "C";
                }
                case 1: {
                    return "D";
                }
                case 2: {
                    return "H";
                }
                case 3: {
                    return "S";
                }
            }
        }
    }
}
