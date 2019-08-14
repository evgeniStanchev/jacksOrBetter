namespace views {
    export class InfoView extends PIXI.Graphics {
        private readonly _x = 275;
        private readonly _y = 575;
        private readonly _width = 465;
        private readonly _height = 30;
        private readonly _radius = 10;
        private _actionText: PIXI.Text;

        constructor() {
            super();
            this.drawFigure();
            this.setTexts();
        }

        private setTexts(): void {
            this._actionText = new PIXI.Text("PRESS DEAL TO RUN NEW GAME", {
                fontSize: 15,
                fontWeight: "bolder",
                fill: 0xffffff,
            });
            this._actionText.x = this._x + (this._width - this._actionText.width) / 2;
            this._actionText.y = this._y + (this._height - this._actionText.height) / 2;
            this.addChild(this._actionText);
        }

        private drawFigure(): void {
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius);
            this.endFill();
        }
    }
}
