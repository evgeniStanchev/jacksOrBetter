namespace views {
    export class BetButtonsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly BUTTON_WIDTH = 86;
        public static readonly DISTANCE_BETWEEN = 10;

        private _selectedButton: BetButton;
        private readonly _x = CardsView.X + CardsView.DISTANCE_BETWEEN + CardsView.CARD_WIDTH;
        private readonly _y = CardsView.Y + CardsView.CARD_HEIGHT + 10;
        private _buttons: BetButton[];
        private _bets: number[];

        constructor() {
            super();
            this._buttons = [];
            this._bets = [];
            this.setBets();
            this.init();
            this.abonate();
        }

        private setBets(): void {
            this._bets[0] = 1;
            this._bets[1] = 2;
            this._bets[2] = 3;
            this._bets[3] = 5;
            this._bets[4] = 10;
        }

        private abonate(): void {
            this._buttons.forEach(button => {
                button.on("buttonSelected", this.selectButton, this);
            });
        }

        private init(): void {
            for (let index = 0; index < BetButtonsView.COUNT; index++) {
                const newButton = new BetButton(this._bets[index]);
                newButton.x = this._x;
                newButton.x += index * (BetButtonsView.DISTANCE_BETWEEN + BetButtonsView.BUTTON_WIDTH);
                newButton.y = this._y;
                this._buttons.push(newButton);
                this.addChild(newButton);
            }
        }

        private selectButton(selectedButton: BetButton): void {
            if (this._selectedButton == selectedButton) {
                console.log("the selected button is this");
                return;
            }
            this._buttons.forEach(button => {
                if (button == selectedButton) {
                    button.selectButton();
                } else {
                    if (button.isSelected) {
                        button.deselectButton();
                    }
                }
            });
            this._selectedButton = selectedButton;
        }
    }
}
