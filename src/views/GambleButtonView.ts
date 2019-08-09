namespace views {
    export class GambleButtonView extends PIXI.Graphics {
        private readonly _x = 780;
        private readonly _y = 645;
        private readonly _width = 160;
        private readonly _height = 30;
        private readonly _radius = 16;
        private _label: PIXI.Text;
        private _lastWinText = "LAST WIN";
        private _gambleText = "GAMBLE";

        constructor() {
            super();
            this.drawFigure();
            this.setTexts();
        }

        private drawFigure(): void {
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius);
            this.endFill();
        }

        private setTexts(): void {
            this._label = new PIXI.Text(this._lastWinText, {
                fontSize: 15,
                fill: 0x014d8a,
                fontWeight: "bolder",
            });
            this._label.x = this._x + (this._width - this._label.width) / 2;
            this._label.y = this._y + (this._height - this._label.height) / 2;
            this.addChild(this._label);
        }
    }
}
