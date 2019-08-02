namespace views {
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
                const newCard = new Card();
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
                if (!this._cards[index].isHeld()) {
                    //TODO reveal the card
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
    }
}
