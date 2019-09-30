namespace views {
  export class WinView extends PIXI.Graphics {
    private readonly _x = 750;
    private readonly _y = 575;
    private readonly _width = 220;
    private readonly _height = 100;
    private readonly _radius = 16;
    private readonly _lastWin: PIXI.Text;
    private readonly _delay = 0.05;
    private _tl: TimelineMax;

    constructor() {
      super();
      this._tl = new TimelineMax();
      this.drawFigure();
      this._lastWin = new PIXI.Text("", {
        fill: 0xffffff,
        fontSize: 40,
        fontWeight: "bolder"
      });
      this._lastWin.x = this._x + (this._width - this._lastWin.width) / 2;
      this._lastWin.y = this._y + (this._height - this._lastWin.height) / 4;
      this.addChild(this._lastWin);
    }

    private drawFigure(): void {
      this.lineStyle(2, 0x014d8a);
      this.beginFill(0x000000);
      this.drawRoundedRect(
        this._x,
        this._y,
        this._width,
        this._height,
        this._radius
      );
      this.endFill();
    }

    public changeLastWin(lastWin: number): void {
      if (lastWin != null && lastWin != 0) {
        this._lastWin.text = lastWin.toString();
        this._lastWin.x = this._x + (this._width - this._lastWin.width) / 2;
      } else {
        this.emit("Collecting ended");
      }
    }

    public changeLastWinSequentially(lastWin: number): void {
      if (lastWin != null && lastWin != 0) {
        for (let currentAmount = 1; currentAmount <= lastWin; currentAmount++) {
          this._tl.add(
            TweenMax.delayedCall(this._delay, () => {
              this._lastWin.text = currentAmount.toString();
              this._lastWin.x =
                this._x + (this._width - this._lastWin.width) / 2;
            })
          );
        }
        this._tl.call(this.stopChangingLastWin, null, this);
      } else {
       this.stopChangingLastWin();
      }
    }

    // public changeLastWinSequentially(lastWin: number): void {
    //     if (lastWin != null && lastWin != 0) {
    //       const lastWinString = lastWin.toString;
    //       TweenMax.to(this._lastWin, 3, {
    //         text: lastWin.toString()
    //       })
    //     } else {
    //       this._tl.call(this.stopChangingLastWin, null, this);
    //     }
    //   }

    public buttonCollectClicked(): void {
      this.stopChangingLastWin();
    }

    private stopChangingLastWin(): void {
      this._tl.pause();
      this._tl = new TimelineMax();
      this._tl.call(() => {
        this.emit("Collecting ended");
      });
    }
  }
}
