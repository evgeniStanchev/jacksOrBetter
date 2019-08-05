///<reference path="../types/rank.ts"/>
///<reference path="../types/suit.ts"/>
namespace views {
    import Rank = poker.rank;
    import Suit = poker.suit;
    export class CardsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly X = 90;
        public static readonly Y = 235;
        public static readonly CARD_WIDTH = 170;
        public static readonly CARD_HEIGHT = 235;
        public static readonly DISTANCE_BETWEEN = 10;

        private _cards: Card[];
        private _speed: number = 1;

        constructor() {
            super();
            this._cards = [];
            this.init();
        }

        private init(): void {
            for (let index = 0; index < CardsView.COUNT; index++) {
                const newCard = new Card(this.getRandomSuit(), this.getRandomRank());
                newCard.x = CardsView.X;
                newCard.x += index * (CardsView.CARD_WIDTH + CardsView.DISTANCE_BETWEEN);
                newCard.y = CardsView.Y;
                this._cards.push(newCard);
                this.addChild(newCard);
            }
        }

        public get cards(): Card[] {
            return this._cards;
        }

        set revealSpeed(val: number) {
            this._speed = val;
        }

        revealCards(): void {
            for (let index = 0; index < this._cards.length; index++) {
                if (!this._cards[index].isHeld) {
                    setTimeout(() => {
                        this._cards[index].reveal();
                    }, 100 * index);
                }
            }
        }

        holdCard(index: number): void {
            this._cards[index].hold();
        }

        releaseCard(index: number): void {
            this._cards[index].release();
        }

        releaseAllCards(): void {
            this._cards.forEach(card => {
                card.release();
            });
        }

        //TODO alternative
        private getRandomRank(): Rank {
            const num = Math.floor(Math.random() * 10 + 2);
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
