///<reference path="./../types/suit.ts"/>
///<reference path="./../types/rank.ts"/>
///<reference path="../Message.ts"/>
namespace views {
    import suit = poker.suit;
    import rank = poker.rank;
    import Message = poker.Message;
    export class OptionsRankMenu extends PIXI.Sprite {
        public readonly _width = 87;
        private readonly _rectangleWidth = 49;
        private readonly _rectangleHeight = 25;
        private readonly _menuLabelSize = 20;
        private readonly _blackColor = 0x000000;
        private readonly _whiteColor = 0xffffff;
        private readonly _redColor = 0xff0000;

        private readonly _clubTexture = PIXI.Texture.from("club");
        private readonly _diamondTexture = PIXI.Texture.from("diamond");
        private readonly _heartTexture = PIXI.Texture.from("heart");
        private readonly _spadeTexture = PIXI.Texture.from("spade");
        private readonly _rank: rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        private readonly _options: PIXI.Graphics[];
        private readonly _suit: suit;
        private readonly _suitSprite: PIXI.Sprite;

        private readonly _text: string;

        private _rectangle: PIXI.Graphics;
        private _textColor: number;
        private _selectedCard: Card;
        private _menuLabel: PIXI.Text;

        constructor(suit: suit) {
            super();
            this._options = [];
            this._suitSprite = new PIXI.Sprite();
            this._suit = suit;
            this.setTextColor();
            this.createRectangleWithTriangleAndLabel();
            this.addChild(this._rectangle);
            this.createSuitRect();
            this.createValuesMenu();
        }

        private setTextColor() {
            if (this._suit == "Clubs" || this._suit == "Spades") {
                this._textColor = this._blackColor;
            } else if (this._suit == "Hearts" || this._suit == "Diamonds") {
                this._textColor = this._redColor;
            }
        }

        public get suit(): suit {
            return this._suit;
        }

        private createSuitRect(): void {
            switch (this._suit) {
                case "Clubs": {
                    this._suitSprite.texture = this._clubTexture;
                    break;
                }
                case "Diamonds": {
                    this._suitSprite.texture = this._diamondTexture;
                    break;
                }
                case "Hearts": {
                    this._suitSprite.texture = this._heartTexture;
                    break;
                }
                case "Spades": {
                    this._suitSprite.texture = this._spadeTexture;
                    break;
                }
            }
            this._suitSprite.y = this.y - 54;
            this.addChild(this._suitSprite);
        }

        private createValuesMenu(): void {
            for (let i = 0, y = 0; i < this._rank.length; i++, y += 15) {
                const option = new PIXI.Graphics();
                option.lineStyle(0, this._blackColor);
                option.beginFill(this._whiteColor);
                option.drawRect(0, y, this._suitSprite.texture.width, this._rectangleHeight);
                option.y = y;
                this._rectangle.endFill();
                const text = new PIXI.Text(this._rank[i], {
                    fontSize: this._menuLabelSize,
                    fill: this._textColor,
                });
                text.y = option.y;
                text.x = (option.width - text.width) / 2;
                option.interactive = true;
                option.on("mouseover", this.onMouseOver, this);
                option.on("mouseout", this.onMouseOut, this);
                option.on("pointerdown", this.onPointerDown, this);
                option.addChild(text);
                this.addChild(option);
                this._options.push(option);
            }
        }

        private onPointerDown(event: PIXI.interaction.InteractionEvent): void {
            const option = event.currentTarget as PIXI.Graphics;
            //we use ranks' indexes to create the text of the option, so the indexes are the same
            const rank: rank = this._rank[this._options.indexOf(option)];
            this.emit(Message.optionSelected, [this._suit, rank]);
        }

        private onMouseOver(event: PIXI.interaction.InteractionEvent): void {
            const option = event.currentTarget as PIXI.Graphics;
            this.shade(option);
        }

        private onMouseOut(event: PIXI.interaction.InteractionEvent): void {
            const option = event.currentTarget as PIXI.Graphics;
            this.removeShade(option);
        }

        private shade(obj: PIXI.Graphics): void {
            TweenMax.to(obj, 0, {
                alpha: 0.5,
            });
        }

        private removeShade(obj: PIXI.Graphics): void {
            TweenMax.to(obj, 0, {
                alpha: 1,
            });
        }

        private createRectangleWithTriangleAndLabel(): void {
            this._rectangle = new PIXI.Graphics();
            this._rectangle.lineStyle(0, this._blackColor);
            this._rectangle.beginFill(this._whiteColor);
            this._rectangle.drawRect(0, 0, this._rectangleWidth, this._rectangleHeight);
            this._rectangle.endFill();

            this._menuLabel = new PIXI.Text(this._text, {
                fontSize: this._menuLabelSize,
                fill: this._textColor,
            });
            this._menuLabel.y -= 22;
            this._menuLabel.x += 15;
            this._rectangle.addChild(this._menuLabel);
        }

        public newSelectedCard(card: Card): void {
            this._selectedCard = card;
        }

        public deselectedCards(): void {
            this._selectedCard = null;
        }
    }
}
