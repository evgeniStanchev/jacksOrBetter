namespace views {
    export class BetButton extends PIXI.Sprite {
        public readonly _width = 87;

        private _isDown: boolean;
        private _actionLabel: PIXI.Text;
        private _isSelected: boolean;

        private readonly _isMaxBet: boolean;
        private readonly _index: number;

        private readonly _inactiveTexture = PIXI.Texture.from("buttonInactive");
        private readonly _activeTexture = PIXI.Texture.from("buttonActive");
        private readonly _actionLabelFontSize = 15;
        private readonly _actionLabelY = 52;
        private readonly _actionLabelText: string;

        private _betLabel: PIXI.Text;
        private readonly _betLabelFontSize = 12;
        private readonly _betLabelY = -1;
        private readonly _betLabelText: string = "BET";

        private _betValueLabel: PIXI.Text;
        private readonly _betValue: number;
        private readonly _betValueLabelY = 13;
        private readonly _betValueLabelSize = 35;

        constructor(betValue: number, index: number, actionLabel: string, isMaxBet) {
            super();
            this.texture = this._inactiveTexture;
            this.buttonMode = true;
            this.on("pointerdown", this.onPointerDown);
            this.on("pointerup", this.onPointerUp);
            this.on("pointerupoutside", this.onPointerUpOutside);
            this._index = index;
            this._betValue = betValue;
            this._isDown = false;
            this._isMaxBet = isMaxBet;
            this._actionLabelText = actionLabel;
            this.setTexts();
        }

        public get isSelected(): boolean {
            return this._isSelected;
        }

        public get betValue(): number {
            return this._betValue;
        }

        public set actionLabelText(text: string) {
            this._actionLabel.text = text;
            this.resetCoordinates();
        }

        public get isMaxBet(): boolean {
            return this._isMaxBet;
        }

        public selectButton(): void {
            this._isSelected = true;
            this.texture = this._activeTexture;
        }

        public deselectButton(): void {
            this._isSelected = false;
            this.texture = this._inactiveTexture;
        }

        private resetCoordinates(): void {
            this._actionLabel.x = (this._width - this._actionLabel.width) / 2;
            this._actionLabel.y = this._actionLabelY;
        }

        private onPointerUp(e: PIXI.interaction.InteractionEvent): void {
            if (this._isDown) {
                this.goUp();
                this.emit("buttonSelected", this._index);
            }
        }

        private onPointerUpOutside(e: PIXI.interaction.InteractionEvent): void {
            if (this._isDown) {
                this.goUp();
            }
        }

        private onPointerDown(e: PIXI.interaction.InteractionEvent): void {
            this.goDown();
        }

        private goDown(): void {
            this.y += 5;
            this._isDown = true;
        }

        private goUp(): void {
            this.y -= 5;
            this._isDown = false;
        }

        private setTexts(): void {
            this._actionLabel = new PIXI.Text(this._actionLabelText, {
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

            this._betValueLabel = new PIXI.Text(this._betValue.toString(), {
                fontSize: this._betValueLabelSize,
                fill: "white",
                align: "center",
            });
            this._betValueLabel.x = (this._width - this._betValueLabel.width) / 2;
            this._betValueLabel.y = this._betValueLabelY;

            this.addChild(this._betValueLabel);
        }
    }
}
