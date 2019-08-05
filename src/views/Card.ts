///<reference path="../types/rank.ts"/>
///<reference path="../types/suit.ts"/>
namespace views {
    import Rank = poker.rank;
    import Suit = poker.suit;

    export class Card extends PIXI.Sprite {
        private _heldLabel: PIXI.Sprite;
        private _winLabel: PIXI.Sprite;
        private _suitLabel: PIXI.Sprite;
        private _rankLabel: PIXI.Text;
        private _specificSprite: PIXI.Sprite;

        private _faceTexture: PIXI.Texture;
        private _backTexture: PIXI.Texture;

        private _isHeld: boolean;
        private _suit: Suit;
        private _rank: Rank;

        constructor(suit: Suit, rank: Rank) {
            super();
            this._suit = suit;
            this._rank = rank;
            this.init();
            this.texture = this._backTexture;
        }

        private init() {
            this._backTexture = PIXI.Texture.from("./assets/mainCards/cardBackBlack.png");
            this._faceTexture = PIXI.Texture.from("./assets/mainCards/card_clean.png");
            this._heldLabel = PIXI.Sprite.fromImage("./assets/mainCards/held.png");
            this._winLabel = PIXI.Sprite.fromImage("./assets/mainCards/win_en.png");

            this._isHeld = false;
            this._suitLabel = this.getSuitSprite(this._suit);

            if (this._suit == "D" || this._suit == "H") {
                this._rankLabel = new PIXI.Text(this._rank, {
                    fontSize: 55,
                    fontWeight: "bolder",
                    fill: 0xff0000,
                });
            } else {
                this._rankLabel = new PIXI.Text(this._rank, {
                    fontSize: 55,
                    fontWeight: "bolder",
                    fill: 0x000000,
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
                        this._specificSprite = PIXI.Sprite.fromImage("./assets/mainCards/jackImage.png");
                        break;
                    }
                    case "Q": {
                        this._specificSprite = PIXI.Sprite.fromImage("./assets/mainCards/queenImage.png");
                        break;
                    }
                    case "K": {
                        this._specificSprite = PIXI.Sprite.fromImage("./assets/mainCards/kingImage.png");
                        break;
                    }
                    case "A": {
                        this._specificSprite = PIXI.Sprite.fromImage("./assets/mainCards/aceImage.png");
                        break;
                    }
                }
                this._specificSprite.x = 70;
                this._specificSprite.y = 10;
            }
        }

        get isHeld(): boolean {
            return this._isHeld;
        }

        reveal(): void {
            if (!this._isHeld) {
                this.texture = this._faceTexture;
                this.addChild(this._suitLabel);
                this.addChild(this._rankLabel);
                if(this._specificSprite){
                this.addChild(this._specificSprite);
            }
            }
        }

        toBack(): void {
            this.texture = this._backTexture;
        }

        hold(): void {
            this._isHeld = true;
            this.addChild(this._heldLabel);
        }

        win(): void {
            this.addChild(this._winLabel);
        }

        release(): void {
            this._isHeld = false;
            this.removeChild(this._heldLabel);
        }

        private getSuitSprite(suit: Suit): PIXI.Sprite {
            switch (suit) {
                case "C": {
                    return PIXI.Sprite.fromImage("../../bin/assets/mainCards/clubs.png");
                }
                case "D": {
                    return PIXI.Sprite.fromImage("../../bin/assets/mainCards/diamonds.png");
                }
                case "H": {
                    return PIXI.Sprite.fromImage("../../bin/assets/mainCards/hearts.png");
                }
                case "S": {
                    return PIXI.Sprite.fromImage("../../bin/assets/mainCards/spades.png");
                }
            }
        }
    }
}
