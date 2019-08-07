namespace views {
    export class BalanceView extends PIXI.Graphics {
        private readonly _x = 100;
        private readonly _y = 480;
        private readonly _width = 160;
        private readonly _height = 55;
        private readonly _radius = 16;

        private readonly _balanceLabel = new PIXI.Text("BALANCE", {
            fill: 0x015d8a,
            fontSize: 13,
            fontWeight: "bolder",
        });

        constructor() {
            super();
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius);
            this.endFill();
            this._balanceLabel.x = this._x + (this._width - this._balanceLabel.width) / 2;
            this._balanceLabel.y = this._y - 5;
            this.addChild(this._balanceLabel);
        }
    }
}
