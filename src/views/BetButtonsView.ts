///<reference path="../types/listening.ts"/>
///<reference path="../types/action.ts"/>
///<reference path="../Notifications.ts"/>
namespace views {
    import Action = poker.action;
    import listening = poker.listening;
    import Notification = poker.Notifications;

    export class BetButtonsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly BUTTON_WIDTH = 86;
        public static readonly DISTANCE_BETWEEN = 10;

        private readonly _buttonsY = 610;

        private readonly _actionLabelDraw: string = "Draw";

        private readonly _actionLabelDeal: string = "Deal";
        private readonly _actionLabelCollect: string = "Collect";
        private readonly _actionLabelMaxBet: string = "Max Bet";

        private _isCollectingStopped = false;
        private _buttons: BetButton[];
        private _bets: number[];
        private _currentAction: Action;
        private _currentPrice: number;
        private _selectedButton: BetButton;

        constructor() {
            super();
            this._currentAction = "deal clicked";
            this._buttons = [];
            this._bets = [];
            this.setBets();
            this.init();
            this.buttonsInteractive = true;
            this.listening("on");
        }

        public set buttonsInteractive(v: boolean) {
            for (const button of this._buttons) {
                button.interactive = v;
            }
        }

        //TODO not here
        private setBets(): void {
            this._bets[0] = 1;
            this._bets[1] = 2;
            this._bets[2] = 3;
            this._bets[3] = 5;
            this._bets[4] = 10;
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

        private listening(method: listening): void {
            for (const button of this._buttons) {
                button[method]("buttonSelected", this.selectButton, this);
            }
        }

        private selectButton(buttonIndex: number): void {
            for (const button of this._buttons) {
                if (this._buttons.indexOf(button) == buttonIndex) {
                    button.selectButton();
                    this._selectedButton = button;
                } else {
                    if (button.isSelected) {
                        button.deselectButton();
                    }
                }
            }

            //TODO Action must be in controller
            this.emit(this._currentAction, this._selectedButton);
        }

        private updateActionLabel(newLabel: string): void {
            for (const button of this._buttons) {
                if (!button.isMaxBet) {
                    button.actionLabelText = newLabel;
                }
            }
        }

        private isWin(): boolean {
            const isWin = Math.floor(Math.random() * 10) % 2 == 0 ? true : false;
            this._currentPrice = this.calculatePrice();
            return isWin;
        }

        private calculatePrice(): number {
            //TODO
            return 200;
        }

        private collect(): void {
            let animatedPrice = 0;
            const collecting = setInterval(() => {
                if (this._isCollectingStopped) {
                    console.log(this._currentPrice);
                    this.resetVariables();
                    clearInterval(collecting);
                    this.updateActionLabel(this._actionLabelDeal);
                    //TODO this is not the right place
                    this._currentAction = "deal clicked";
                    this.emit("end");
                } else if (animatedPrice == this._currentPrice) {
                    this.resetVariables();
                    clearInterval(collecting);
                    this.updateActionLabel(this._actionLabelDeal);
                    //TODO this is not the right place
                    this._currentAction = "deal clicked";
                    this.emit("end");
                } else {
                    animatedPrice += 5;
                    console.log(animatedPrice);
                }
            }, 100);
        }

        private resetVariables(): void {
            this._currentPrice = 0;
            this._isCollectingStopped = false;
        }

        // if (this.isWin()) {
        //     this.emit(this._currentAction);
        //     this.updateActionLabel(this._actionLabelCollect);
        //     this.collect();
        //     this._currentAction = "collect";
        // } else {
        //     this.emit(this._currentAction);
        //     this.updateActionLabel(this._actionLabelDeal);
        //     this._currentAction = "deal";
        // }

        private stopCollecting() {
            this._isCollectingStopped = true;
        }
    }
}
