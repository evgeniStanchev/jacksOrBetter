namespace views {
    export class PriceBoardView extends PIXI.Graphics {
        private readonly _x = 90;
        private readonly _y = 20;
        private readonly _width = 890;
        private readonly _height = 300;
        private readonly _innerX = this._x + 10;
        private readonly _innerY = this._y + 10;
        private readonly _innerWidth = this._width - 20;
        private readonly _innerHeight = this._height - 20;
        private readonly _radius = 16;


        constructor() {
            super();
            this.drawFigures();
        }

        private drawFigures():void{
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRect(this._x, this._y, this._width, this._height);
            this.endFill();
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._innerX, this._innerY, this._innerWidth, this._innerHeight, this._radius);
            this.endFill();
            const justText = new PIXI.Text("This will be the score board!", {
                fill: 0x015d8a,
                fontSize: 30,
                fontWeight: "bolder",
            });
            justText.x = this._innerX + (this._innerWidth - justText.width) / 2;
            justText.y = this._innerY + (this._innerHeight - justText.height) / 2;
            this.addChild(justText);
        }

    }
}
