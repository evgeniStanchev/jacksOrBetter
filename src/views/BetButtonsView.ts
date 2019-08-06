///<reference path="../types/listening.ts"/>
///<reference path="../types/action.ts"/>
namespace views {
    import Action = poker.action;
    import listening = poker.listening;

    export class BetButtonsView extends PIXI.Container {
        public static readonly COUNT = 5;
        public static readonly BUTTON_WIDTH = 86;
        public static readonly DISTANCE_BETWEEN = 10;

        private readonly _actionLabelDraw: string = "Draw";
        private readonly _actionLabelDeal: string = "Deal";
        private readonly _actionLabelCollect: string = "Collect";
        private readonly _actionLabelMaxBet: string = "Max Bet";

        private _isCollectingStopped = false;
        private _buttons: BetButton[];
        private _bets: number[];
        private _currentAction: Action;
        private _currentPrice: number;

        constructor() {
            super();
            this._currentAction = "deal";
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

        public get buttons(): BetButton[] {
            return this._buttons;
        }

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
            const button = new BetButton(this._bets[index], index, this._actionLabelDeal);
            if (index == BetButtonsView.COUNT - 1) {
                button.isMaxBet = true;
                button.actionLabelText = this._actionLabelMaxBet;
            }
            button.x = 270 + index * (BetButtonsView.DISTANCE_BETWEEN + BetButtonsView.BUTTON_WIDTH);
            button.y = 480;
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
                } else {
                    if (button.isSelected) {
                        button.deselectButton();
                    }
                }
            }
            this.doAction();
        }

        private hasBalance(): boolean {
            return true;
        }

        private takeBalance(): void {
            //TODO
        }

        private turnCards(heldCards?: Card[]): void {
            //TODO
        }

        private updateActionLabel(newLabel: string): void {
            for (const button of this._buttons) {
                if (!button.isMaxBet) {
                    button.actionLabelText = newLabel;
                }
            }
        }

        private isWin(): boolean {
            const num: number = Math.floor(Math.random() * 10) % 2;
            const isWin = num == 0 ? true : false;
            console.log(isWin ? "win" : "lose");
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
                    this._currentAction = "deal";
                    this.emit("end");
                } else if (animatedPrice == this._currentPrice) {
                    this.resetVariables();
                    clearInterval(collecting);
                    this.updateActionLabel(this._actionLabelDeal);
                    //TODO this is not the right place
                    this._currentAction = "deal";
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

        private doAction(): void {
            switch (this._currentAction) {
                case "deal": {
                    if (this.hasBalance()) {
                        console.log("emitting deal");
                        this.takeBalance();
                        this.updateActionLabel(this._actionLabelDraw);
                        this.emit(this._currentAction);
                        this._currentAction = "draw";
                        break;
                    } else {
                        throw "Umm... you are poor";
                        break;
                    }
                }
                case "draw": {
                    this.turnCards();
                    if (this.isWin()) {
                        this.emit(this._currentAction);
                        this.updateActionLabel(this._actionLabelCollect);
                        this.collect();
                        this._currentAction = "collect";
                    } else {
                        this.emit(this._currentAction);
                        this.updateActionLabel(this._actionLabelDeal);
                        this._currentAction = "deal";
                    }
                    break;
                }
                case "collect": {
                    this.emit(this._currentAction);
                    this.updateActionLabel(this._actionLabelDeal);
                    this._currentAction = "deal";
                    this.stopCollecting();

                    break;
                }
            }
        }

        private stopCollecting() {
            this._isCollectingStopped = true;
        }
    }
}
