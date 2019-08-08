namespace views {
    export class WinView extends PIXI.Graphics {
        private readonly _x = 750;
        private readonly _y = 575;
        private readonly _width = 220;
        private readonly _height = 100;
        private readonly _radius = 16;

        constructor() {
            super();
            this.drawFigure();
        }

        private drawFigure(): void {
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius);
            this.endFill();
        }
    }
}
