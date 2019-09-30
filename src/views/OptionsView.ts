///<reference path="../Message.ts"/>
namespace views {
    import Message = poker.Message;
    export class OptionsView extends PIXI.Graphics {
        
        private readonly _x = -900;
        private readonly _y = 0;
        private readonly _width = 900;
        private readonly _height = 800;
        private readonly _button : OptionsButton;
        private _isOpen: boolean;
        // private readonly _radius = 16;

        constructor() {
            super();
            this._isOpen = false;
            this.drawFigures();
            this._button = new OptionsButton();
            this.addChild(this._button);
            this._button.on(Message.optionsButtonClicked, this.moveBoard, this)
        }

        private drawFigures(): void {
            this.lineStyle(2, 0x014d8a);
            this.beginFill(0x000000);
            this.drawRect(this._x, this._y, this._width, this._height);
            this.endFill();
            const justText = new PIXI.Text("OPTIONS", {
                fill: 0x015d8a,
                fontSize: 30,
                fontWeight: "bolder",
            });
            justText.x = this._x + (this._width - justText.width) / 2;
            justText.y = 30;
            this.addChild(justText);
        }

        private moveBoard():void{
            if(this._isOpen){
                this._isOpen=false;
                console.log("CLOSING")
                TweenMax.to(this, 1, {
                    x: 0
                });
            }else{
                this._isOpen = true;
                console.log("OPENING")
                TweenMax.to(this, 1, {
                    x: 980
                });
            }

        }

    }
}
