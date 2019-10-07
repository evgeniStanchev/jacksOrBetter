///<reference path="../Message.ts"/>
namespace views {
    import Message = poker.Message;
    export class OptionsView extends PIXI.Container {
        private readonly _panelX = -900;
        private readonly _panelY = 0;
        private readonly _button: OptionsButton;
        private readonly _optionsPanel: OptionsPanel;
        private readonly _delay = 1;
        private _isOpen: boolean;
        // private readonly _radius = 16;

        constructor() {
            super();
            this._isOpen = false;
            this._optionsPanel = new OptionsPanel();
            this._optionsPanel.x = this._panelX;
            this._optionsPanel.y = this._panelY;
            this._button = new OptionsButton();
            this.addChild(this._optionsPanel);
            this.addChild(this._button);
            this._button.on(Message.optionsButtonClicked, this.moveBoard, this);
        }

        private moveBoard(): void {
            if (this._isOpen) {
                this._isOpen = false;
                console.log("CLOSING");
                TweenMax.to(this, this._delay, {
                    x: 0,
                    yoyo: true,
                });
            } else {
                this._isOpen = true;
                console.log("OPENING");
                TweenMax.to(this, this._delay, {
                    x: 980,
                    yoyo: true,
                });
            }
        }
    }
}
