///<reference path="../Message.ts"/>
namespace views {
    import Message = poker.Message;
    export class OptionsButton extends PIXI.Sprite {
        constructor() {
            super();
            this.buttonMode = true;
            this.interactive = true;
            this.on("pointerdown", this.onPointerDown);
            this.texture = PIXI.Texture.from("options");
            this.x = 10;
            this.y = 10;
            this.width = 75;
            this.height = 75;
        }

        private onPointerDown():void{
            this.emit(Message.optionsButtonClicked);
        }
    }
}
