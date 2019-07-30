namespace poker.views.cards {
    export class CardsView extends PIXI.Container {
        _cards: Card[];

        private _speed: number = 1;

        constructor() {
            super();
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
