///<reference path="../types/rank.ts"/>
///<reference path="../types/suit.ts"/>
namespace views {
    import Rank = poker.rank;
    import Suit = poker.suit;

    export class Card extends PIXI.Sprite {
        private _heldLabel: PIXI.Sprite;
        private _winLabel: PIXI.Sprite;
        private _suitLabel: PIXI.Sprite;
        private _suitLabelSize = 55;
        private _rankLabel: PIXI.Text;
        private _specificSprite: PIXI.Sprite;
        private _specificSpriteX = 70;
        private _specificSpriteY = 10;
        private _red = 0xff0000;
        private _black = 0x000000;

        private _faceTexture: PIXI.Texture;
        private _backTexture: PIXI.Texture;

        private _isHeld: boolean;
        private _suit: Suit;
        private _rank: Rank;

        constructor() {
            super();
            this.init();
            this.texture = this._backTexture;
        }

        public setSuitAndRank(rank: Rank, suit: Suit) {
            this._rank = rank;
            this._suit = suit;
            this.addSuitAndRank();
        }

        public get rank(): Rank {
            return this._rank;
        }

        public get suit(): Suit {
            return this._suit;
        }

        private init() {
            this._backTexture = PIXI.Texture.from("cardBackBlack");
            this._faceTexture = PIXI.Texture.from("cleanCard");
            this._heldLabel = PIXI.Sprite.from("heldLabel");
            this._heldLabel.x = (this._faceTexture.width - this._heldLabel.width) / 2 + 5;
            this._heldLabel.y = 5;
            this._winLabel = PIXI.Sprite.from("winLabel");
            this._winLabel.x = (this._faceTexture.width - this._winLabel.width) / 2 + 5;
            this._winLabel.y = this._faceTexture.height - this._winLabel.height - 10;
            this._isHeld = false;
        }

        public addSuitAndRank(): void {
            this._suitLabel = this.getSuitSprite(this._suit);
            if (this._suit == "Diamonds" || this._suit == "Hearts") {
                this._rankLabel = new PIXI.Text(this._rank, {
                    fontSize: this._suitLabelSize,
                    fontWeight: "bolder",
                    fill: this._red,
                });
            } else {
                this._rankLabel = new PIXI.Text(this._rank, {
                    fontSize: this._suitLabelSize,
                    fontWeight: "bolder",
                    fill: this._black,
                });
            }
            this._rankLabel.x = 30 - 8 * this._rankLabel.text.length;
            this._rankLabel.y = 3;

            this.addSpecificSprite();
        }

        private addSpecificSprite(): void {
            if (!Number(this._rank)) {
                switch (this._rank) {
                    case "J": {
                        this._specificSprite = PIXI.Sprite.from("jack");
                        break;
                    }
                    case "Q": {
                        this._specificSprite = PIXI.Sprite.from("queen");
                        break;
                    }
                    case "K": {
                        this._specificSprite = PIXI.Sprite.from("king");
                        break;
                    }
                    case "A": {
                        this._specificSprite = PIXI.Sprite.from("ace");
                        break;
                    }
                }
                this._specificSprite.x = this._specificSpriteX;
                this._specificSprite.y = this._specificSpriteY;
            }
        }

        get isHeld(): boolean {
            return this._isHeld;
        }

        public reveal(): void {
            if (!this._isHeld) {
                this.texture = this._faceTexture;
                this.addChild(this._suitLabel);
                this.addChild(this._rankLabel);
                if (this._specificSprite) {
                    this.addChild(this._specificSprite);
                }
            }
        }
        //TODO Check if this works
        public getIndex(rank: Rank, suit: Suit): number {
            let index = 0;
            index += this.getRankValue(rank);
            index += this.getSuitValue(suit);
            return index;
        }

        private getSuitValue(suit: Suit): number {
            switch (suit) {
                case "Clubs": {
                    return 0;
                }
                case "Diamonds": {
                    return 12;
                }

                case "Hearts": {
                    return 24;
                }
                case "Spades": {
                    return 36;
                }
            }
        }

        private getRankValue(rank: Rank): number {
            switch (rank) {
                case "A":
                    return 0;
                case "K": {
                    return 12;
                }
                case "Q": {
                    return 11;
                }
                case "J": {
                    return 10;
                }
                default: {
                    return parseInt(rank) + 1;
                }
            }
        }

        public hide(): void {
            this._specificSprite = null;
            this.removeChildren();
            this.texture = this._backTexture;
        }

        public hold(): void {
            this._isHeld = true;
            this.addChild(this._heldLabel);
        }

        public mark(): void {
            TweenMax.to(this, 0, {
                alpha: 0.5,
            });
        }

        public unmark(): void {
            TweenMax.to(this, 0, {
                alpha: 1,
            });
        }

        public win(): void {
            this.addChild(this._winLabel);
        }

        public release(): void {
            this._isHeld = false;
            this.removeChild(this._heldLabel);
        }

        private getSuitSprite(suit: Suit): PIXI.Sprite {
            switch (suit) {
                case "Clubs": {
                    return PIXI.Sprite.from("clubs");
                }
                case "Diamonds": {
                    return PIXI.Sprite.from("diamonds");
                }
                case "Hearts": {
                    return PIXI.Sprite.from("hearts");
                }
                case "Spades": {
                    return PIXI.Sprite.from("spades");
                }
            }
        }
    }
}
