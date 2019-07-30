namespace poker.views.cards {
    export class Card extends PIXI.Sprite {
        private _heldLabel: PIXI.Sprite;

        private _faceTexture: PIXI.Texture;
        private _backTexture: PIXI.Texture;

        constructor() {
            super();
            this._heldLabel = new PIXI.Sprite();
            this.addChild(this._heldLabel);
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
            this._heldLabel.texture = PIXI.Texture.from("heldLabel");
        }

        release(): void {
            this._heldLabel.texture = null;
        }
    }
}
