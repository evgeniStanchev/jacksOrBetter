namespace views {
    export class BalanceView extends PIXI.Graphics {
        private readonly _x = 100;
        private readonly _y = 575;
        private readonly _width = 160;
        private readonly _height = 55;
        private readonly _radius = 16;
        private readonly _delay = 0.3;

        private readonly _balanceLabel: PIXI.Text;
        private _balanceAmountText: PIXI.Text;
        private _balanceAmount: number;
        private _tl: TimelineMax;

        constructor() {
            super();
            this._tl = new TimelineMax();
            this.drawFigure();
            this._balanceLabel = new PIXI.Text("BALANCE", {
                fill: 0x015d8a,
                fontSize: 13,
                fontWeight: "bolder",
            });
            this.insertTexts();
        }

        public buttonCollectClicked(): void {
            this.stopCollecting();
        }

        public initializeBalance(balance: number) {
            this._balanceAmount = balance;
            this._balanceAmountText = new PIXI.Text(this._balanceAmount.toString(), {
                fill: 0xffffff,
                fontSize: 30,
                fontWeight: "bolder",
            });
            this._balanceAmountText.x = this._x + (this._width - this._balanceAmountText.width) / 2;
            this._balanceAmountText.y = this._y + (this._height - this._balanceAmountText.height) / 2;
            this.addChild(this._balanceAmountText);
        }

        public insertTexts(): void {
            this._balanceLabel.x = this._x + (this._width - this._balanceLabel.width) / 2;
            this._balanceLabel.y = this._y - 5;
            this.addChild(this._balanceLabel);
        }

        private drawFigure(): void {
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius);
            this.endFill();
        }

        public changeBalance(balance: number): void {
            this._balanceAmount = balance;
            this._balanceAmountText.text = this._balanceAmount.toString();
        }

        public increaseBalance(balance: number): void {
            if (this._balanceAmount < balance) {
                while (this._balanceAmount < balance) {
                    this._tl.add(TweenMax.delayedCall(this._delay, this.changeBalance, [++this._balanceAmount], this));
                }
                this._tl.call(this.stopCollecting, null, this);
            }else{
                this.emit("Collecting ended");
            }
        }

        private stopCollecting(): void {
            this._tl.pause();
            this._tl = new TimelineMax();
            this._tl.call(() => {
                this.emit("Collecting ended");
            });
        }
    }
}
