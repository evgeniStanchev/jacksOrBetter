///<reference path="../types/rank.ts"/>
///<reference path="../types/suit.ts"/>
namespace views {
    import Rank = poker.rank;
    import Suit = poker.suit;
    export class CardsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly DISTANCE_BETWEEN = 10;

        private readonly _x = 90;
        private readonly _y = 335;

        private _cards: Card[];
        private _speed: number = 1;

        constructor() {
            super();
            this._cards = [];
            this.createNewCards();
        }

        public get cards(): Card[] {
            return this._cards;
        }

        public set revealSpeed(val: number) {
            this._speed = val;
        }

        public revealCards(): void {
            for (const card of this._cards) {
                if (!card.isHeld) {
                    setTimeout(() => {
                        card.reveal();
                    }, 100 * this.cards.indexOf(card));
                }
            }
        }

        public hideCards(): void {
            for (const card of this._cards) {
                if(!card.isHeld){
                card.hide();
            }
            }
        }

        public startInteractivity():void{
            for (const card of this._cards) {
                card.interactive = true;
            }
        }

        public stopInteractivity():void{
            for (const card of this._cards) {
                card.interactive = false;
            }
        }

        public holdCard(index: number): void {
            this._cards[index].hold();
        }

        public releaseCard(index: number): void {
            this._cards[index].release();
        }

        public releaseAllCards(): void {
            for (const card of this._cards) {
                card.release();
            }
        }

        public setNewRanksAndSuits(): void {
            for (const card of this._cards) {
                if (!card.isHeld) {
                    do {
                        card.setSuitAndRank(this.getRandomRank(), this.getRandomSuit());
                    } while (this.cardExists(card));
                }
            }
        }
        private createNewCards(): void {
            for (let index = 0; index < CardsView.COUNT; index++) {
                const newCard = new Card();
                newCard.x = this._x;
                newCard.x += index * (newCard.width + CardsView.DISTANCE_BETWEEN);
                newCard.y = this._y;
                newCard.buttonMode= true;
                this._cards.push(newCard);
                this.addChild(newCard);
            }
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
