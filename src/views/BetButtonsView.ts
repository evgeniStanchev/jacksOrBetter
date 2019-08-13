///<reference path="../types/listening.ts"/>
///<reference path="../types/action.ts"/>
namespace views {
    import listening = poker.listening;
    import Action = poker.action;

    export class BetButtonsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly BUTTON_WIDTH = 86;
        public static readonly DISTANCE_BETWEEN = 10;

        private readonly _actionLabelDeal: string = "Deal";
        private readonly _actionLabelMaxBet: string = "Max Bet";

        private readonly _buttons: BetButton[];
        private readonly _buttonsY = 610;

        private readonly _bets: number[];

        constructor(bets: number[]) {
            super();
            this._buttons = [];
            this._bets = bets;
            this.init();
            this.buttonsInteractive = true;
        }

        public get buttons(): BetButton[] {
            return this._buttons;
        }

        public set buttonsInteractive(v: boolean) {
            for (const button of this._buttons) {
                button.interactive = v;
            }
        }

        private init(): void {
            for (let i = 0; i < BetButtonsView.COUNT; i++) {
                this.createButton(i);
            }
        }

        private createButton(index: number) {
            const isMaxBet = index == BetButtonsView.COUNT - 1;
            const button = new BetButton(this._bets[index], index, this._actionLabelDeal, isMaxBet);
            if (button.isMaxBet) {
                button.actionLabelText = this._actionLabelMaxBet;
            }
            button.x = 270 + index * (BetButtonsView.DISTANCE_BETWEEN + BetButtonsView.BUTTON_WIDTH);
            button.y = this._buttonsY;
            this._buttons.push(button);
            this.addChild(button);
        }
    }
}
