namespace views {
    export class BetButton extends PIXI.Sprite {
        public readonly _width = 87;

        private _actionLabel: PIXI.Text;
        private _isSelected: boolean;

        private readonly _inactiveTexture = PIXI.Texture.fromImage("../../bin/assets/button/betButtonInactive.png");
        private readonly _activeTexture = PIXI.Texture.fromImage("../../bin/assets/button/betButtonActive.png");
        private readonly _actionLabelFontSize = 15;
        private readonly _actionLabelY = 52;

        private readonly _actionLabelDraw: string = "Draw";
        private readonly _actionLabelDeal: string = "Deal";
        private readonly _actionLabelCollect: string = "Collect";
        private readonly _actionLabelMaxBet: string = "Max Bet";

        private _betLabel: PIXI.Text;
        private readonly _betLabelFontSize = 12;
        private readonly _betLabelY = -1;
        private readonly _betLabelText: string = "BET";

        private _betPriceLabel: PIXI.Text;
        private readonly _betPrice: number;
        private readonly _betPriceLabelY = 13;
        private readonly _betPriceLabelSize = 35;

        private _isDown: boolean;

        constructor(bet: number) {
            super();
            this.texture = this._inactiveTexture;
            this._isDown = false;
            this.buttonMode = true;
            this.interactive = true;
            this.on("pointerdown", this.onClick);
            this._betPrice = bet;
            this.setTexts();
        }

        public get isSelected(): boolean {
            return this._isSelected;
        }

        public selectButton(): void {
            this._isSelected = true;
            this.texture = this._activeTexture;
        }

        public deselectButton(): void {
            this._isSelected = false;
            this.texture = this._inactiveTexture;
            this.goUp();
        }

        private onClick(): void {
            if (!this._isSelected) {
                this.goDown();
            }
            this.on("pointerup", this.onButtonUp);
            this.on("pointerupoutside", this.onButtonUpOutside);
        }

        private onButtonUp(): void {
            if (!this._isSelected && this._isDown) {
                this.emit("buttonSelected", this);
            }
        }

        private goDown(): void {
            this.y += 5;
            this._isDown = true;
        }

        private goUp(): void {
            this.y -= 5;
            this._isDown = false;
        }

        private onButtonUpOutside(): void {
            if (this._isDown && !this._isSelected) {
                this.goUp();
            }
        }

        private setTexts(): void {
            this._actionLabel = new PIXI.Text(this._actionLabelDeal, {
                fontSize: this._actionLabelFontSize,
            });
            this._actionLabel.x = (this._width - this._actionLabel.width) / 2;
            this._actionLabel.y = this._actionLabelY;
            this.addChild(this._actionLabel);

            this._betLabel = new PIXI.Text(this._betLabelText, {
                fontSize: this._betLabelFontSize,
                fontWeight: "bolder",
            });
            this._betLabel.x = (this._width - this._betLabel.width) / 2;
            this._betLabel.y = this._betLabelY;
            this.addChild(this._betLabel);

            this._betPriceLabel = new PIXI.Text(this._betPrice.toString(), {
                fontSize: this._betPriceLabelSize,
                fill: "white",
                align: "center",
            });
            this._betPriceLabel.x = (this._width - this._betPriceLabel.width) / 2;
            this._betPriceLabel.y = this._betPriceLabelY;

            this.addChild(this._betPriceLabel);
        }
    }
}
