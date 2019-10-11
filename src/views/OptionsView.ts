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
        private _cards: Card[];
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
                if (this._optionsPanel.isOptionUsed) {
                    this._cards = this._optionsPanel.cards;
                    this.sendCardsToServer();
                }
                TweenMax.to(this, this._delay, {
                    x: 0,
                    yoyo: true,
                });
            } else {
                this._isOpen = true;
                TweenMax.to(this, this._delay, {
                    x: 980,
                    yoyo: true,
                });
            }
        }
        //TODO
        private sendCardsToServer(): void {
            
        }
    }
}
