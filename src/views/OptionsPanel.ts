///<reference path="../Message.ts"/>
///<reference path="./../types/suit.ts"/>
///<reference path="./../types/rank.ts"/>

namespace views {
    import suit = poker.suit;
    import rank = poker.rank;
    import Message = poker.Message;
    export class OptionsPanel extends PIXI.Graphics {
        private readonly _width = 900;
        private readonly _height = 800;

        private readonly _cardsX = 5;
        private readonly _cardsY = 480;

        private readonly _borderLineWidth = 2;
        private readonly _borderLineColor = 0x014d8a;
        private readonly _borderFillColor = 0x000000;

        private _isOptionUsed:boolean;

        private _cards: Card[];
        private _selectedCard: Card;

        private _optionsMenuClubs: OptionsRankMenu;
        private readonly _optionsMenuClubsX = 200;
        private readonly _optionsMenuClubsY = 60;

        private _optionsMenuDiamonds: OptionsRankMenu;
        private readonly _optionsMenuDiamondsX = 350;
        private readonly _optionsMenuDiamondsY = 60;

        private _optionsMenuHearts: OptionsRankMenu;
        private readonly _optionsMenuHeartsX = 500;
        private readonly _optionsMenuHeartsY = 60;

        private _optionsMenuSpades: OptionsRankMenu;
        private readonly _optionsMenuSpadesX = 650;
        private readonly _optionsMenuSpadesY = 60;

        constructor() {
            super();
            this.interactive = true;
            this._cards = [];
            this._isOptionUsed = false;
            this.createNewCards();
            this.createMenu();
            this.drawFigures();
            this.on("pointerdown", this.onClick, this);
        }
        
        public get cards() : Card[] {
            return this._cards;
        }
        
        
        public get isOptionUsed() : boolean {
            return this._isOptionUsed;
        }
        

        private createMenu(): void {
            this._optionsMenuClubs = new OptionsRankMenu("Clubs");
            this._optionsMenuClubs.x = this._optionsMenuClubsX;
            this._optionsMenuClubs.y = this._optionsMenuClubsY;
            this.addChild(this._optionsMenuClubs);
            this._optionsMenuDiamonds = new OptionsRankMenu("Diamonds");
            this._optionsMenuDiamonds.x = this._optionsMenuDiamondsX;
            this._optionsMenuDiamonds.y = this._optionsMenuDiamondsY;
            this.addChild(this._optionsMenuDiamonds);
            this._optionsMenuHearts = new OptionsRankMenu("Hearts");
            this._optionsMenuHearts.x = this._optionsMenuHeartsX;
            this._optionsMenuHearts.y = this._optionsMenuHeartsY;
            this.addChild(this._optionsMenuHearts);
            this._optionsMenuSpades = new OptionsRankMenu("Spades");
            this._optionsMenuSpades.x = this._optionsMenuSpadesX;
            this._optionsMenuSpades.y = this._optionsMenuSpadesY;
            this.addChild(this._optionsMenuSpades);
        }

        private createNewCards(): void {
            for (let index = 0; index < CardsView.COUNT; index++) {
                const newCard = new Card();
                newCard.texture = PIXI.Texture.from("cleanCard");
                newCard.x = this._cardsX;
                newCard.x += index * (newCard.width + CardsView.DISTANCE_BETWEEN);
                newCard.y = this._cardsY;
                newCard.buttonMode = true;
                newCard.interactive = true;
                newCard.on("pointerdown", this.onClickCard, this);
                newCard.on("mouseover", this.onPointerOverCard, this);
                newCard.on("mouseout", this.onPointerOutCard, this);
                this._cards.push(newCard);
                this.addChild(newCard);
            }
        }

        private onClickCard(event: PIXI.interaction.InteractionEvent) {
            const card = event.currentTarget as Card;
            if (event.target instanceof Card) {
                this._selectedCard = card;
                this.markSelectedCard();
            }
        }

        private onPointerOverCard(event: PIXI.interaction.InteractionEvent) {
            const currentTarget = event.currentTarget;
            if (currentTarget != this._selectedCard) {
                this.shade(currentTarget);
            }
        }

        private onPointerOutCard(event: PIXI.interaction.InteractionEvent) {
            const currentTarget = event.currentTarget;
            if (currentTarget != this._selectedCard) {
                this.removeShade(currentTarget);
            }
        }

        private shade(obj: Object): void {
            TweenMax.to(obj, 0, {
                alpha: 0.8,
            });
        }

        private removeShade(obj: Object): void {
            TweenMax.to(obj, 0, {
                alpha: 1,
            });
        }

        private onClick(event: PIXI.interaction.InteractionEvent) {
            if (event.target instanceof OptionsPanel) {
                this.unmarkAllCards();
            }
        }

        private markSelectedCard(): void {
            for (const card of this._cards) {
                if (card == this._selectedCard) {
                    card.mark();
                } else {
                    card.unmark();
                }
            }
        }

        private unmarkAllCards(): void {
            for (const card of this._cards) {
                card.unmark();
            }
        }

        private drawFigures(): void {
            this.lineStyle(this._borderLineWidth, this._borderLineColor);
            this.beginFill(this._borderFillColor);
            this.drawRect(0, 0, this._width, this._height);
            this.endFill();
        }
    }
}
