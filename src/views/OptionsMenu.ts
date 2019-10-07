///<reference path="./../types/suit.ts"/>
namespace views {
    import suit = poker.suit;
    export class OptionsMenu extends PIXI.Sprite {
        public readonly _width = 87;
        private readonly _rectangleWidth = 60;
        private readonly _rectangleHeight = 25;
        private readonly _menuLabelSize = 20;
        private readonly _blackColor = 0x000000;
        private readonly _whiteColor = 0xffffff;
        private readonly _redColor = 0xff0000;
        private readonly _textColor: number;
        private readonly _clubTexture = PIXI.Texture.from("club");
        private readonly _diamondTexture = PIXI.Texture.from("diamond");
        private readonly _heartTexture = PIXI.Texture.from("heart");
        private readonly _spadeTexture = PIXI.Texture.from("spade");

        private readonly _values: string[];
        private readonly _text: string;

        private _rectangle: PIXI.Graphics;

        private _selectedCard: Card;
        private _menuLabel: PIXI.Text;
        private readonly _suit: suit;

        constructor(values: string[], suit: suit) {
            super();
            this._values = values;
            this._suit = suit;
            if (this._suit == "Clubs" || this._suit == "Spades") {
                this._textColor = this._blackColor;
            } else if (this._suit == "Hearts" || this._suit == "Diamonds") {
                this._textColor = this._redColor;
            }
            this.createRectangleWithTriangleAndLabel();
            this.addChild(this._rectangle);
            this.createSuitRect();
            this.createValuesMenu();
        }

        public get suit(): suit {
            return this._suit;
        }

        private createSuitRect(): void {
            const suit = new PIXI.Sprite();
            switch (this._suit) {
                case "Clubs": {
                    suit.texture = this._clubTexture;
                    break;
                }
                case "Diamonds": {
                    suit.texture = this._diamondTexture;
                    break;
                }
                case "Hearts": {
                    suit.texture = this._heartTexture;
                    break;
                }
                case "Spades": {
                    suit.texture = this._spadeTexture;
                    break;
                }
            }
            suit.y = this.y - 50;
            this.addChild(suit);
        }

        private createValuesMenu(): void {
            for (let i = 0, y = 0; i < this._values.length; i++, y += 15) {
                const option = new PIXI.Graphics();
                option.lineStyle(0, this._blackColor);
                option.beginFill(this._whiteColor);
                option.drawRect(0, y, this._rectangleWidth, this._rectangleHeight);
                option.y = y;
                this._rectangle.endFill();
                const text = new PIXI.Text(this._values[i], {
                    fontSize: this._menuLabelSize,
                    fill: this._textColor,
                });
                text.y = option.y;
                text.x = (option.width - text.width) / 2;
                option.addChild(text);
                this.addChild(option);
                option.interactive = true;
                option.on("mouseover", this.onPointerOver, this);
                option.on("mouseout", this.onPointerOut, this);
            }
        }

        private onPointerOver(event: PIXI.interaction.InteractionEvent): void {
            const option = event.currentTarget as PIXI.Graphics;
            this.shade(option);
        }

        private onPointerOut(event: PIXI.interaction.InteractionEvent): void {
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
