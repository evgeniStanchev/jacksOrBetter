namespace poker.views.cards {
    export class Card extends PIXI.Sprite {
        private _heldLabel: PIXI.Sprite;
        private _winLabel: PIXI.Sprite;

        private _faceTexture: PIXI.Texture;
        private _backTexture: PIXI.Texture;

        constructor() {
            super();
            this.init();
        }

        private init() {
            this._backTexture = PIXI.Texture.from("./assets/mainCards/cardBackBlack.png");
            this._faceTexture = PIXI.Texture.from("./assets/mainCards/card_clean.png");
            this._heldLabel = PIXI.Sprite.fromImage("./assets/mainCards/held.png");
            this._winLabel = PIXI.Sprite.fromImage("./assets/mainCards/win_en.png");
        }

        isHeld(): boolean {
            if (this._heldLabel.texture === PIXI.Texture.from("heldLabel")) {
                return true;
            }
            return false;
        }

        toFace(): void {
            this.texture = this._faceTexture;
        }

        toBack(): void {
            this.texture = this._backTexture;
        }

        hold(): void {
            this.addChild(this._heldLabel);
        }

        win(): void {
            this.addChild(this._winLabel);
        }

        release(): void {
            this.removeChild(this._heldLabel);
        }
    }
}
