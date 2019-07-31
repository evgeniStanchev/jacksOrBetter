namespace poker.model {
    export class Resources extends Pluck.Model {
        constructor() {
            super();
        }

        load(): void {
            PIXI.loader
                .add("background", "./assets/background.png")
                .add("sound", "./assets/sound.png")
                .add("cleanCard", "./assets/mainCards/card_clean.png")
                .add("cardBackBlack", "./assets/mainCards/cardBackBlack.png")
                .add("cardBackRed", "./assets/mainCards/cardBackRed.png")
                .add("clubs", "./assets/mainCards/clubs.png")
                .add("diamonds", "./assets/mainCards/diamonds.png")
                .add("hearts", "./assets/mainCards/hearts.png")
                .add("spades", "./assets/mainCards/spades.png")
                .add("ace", "./assets/mainCards/aceImage.png")
                .add("king", "./assets/mainCards/kingImage.png")
                .add("queen", "./assets/mainCards/queenImage.png")
                .add("jack", "./assets/mainCards/jackImage.png")
                .add("heldLabel", "./assets/mainCards/held.png")
                .add("winLabel", "./assets/mainCards/win_en.png")
                .add("gambleRed", "./assets/gamble/gambleRed.png")
                .add("gambleWin", "./assets/gamble/gambleWin.png")
                .add("cardBlink", "./assets/commonSounds/cardBlink.mp3")
                .add("cardSwap", "./assets/commonSounds/cardSwap.mp3")
                .add("collectButton", "./assets/commonSounds/collectButton.mp3")
                .add("creditAnimation", "./assets/commonSounds/creditAnimation.mp3")
                .add("gambleCardClick", "./assets/commonSounds/gambleCardClick.mp3")
                .add("gambleOpen", "./assets/commonSounds/gambleOpen.mp3")
                .add("gambleWon", "./assets/commonSounds/gambleWon.mp3")
                .add("holdCard", "./assets/commonSounds/holdCard.mp3")
                .add("mainButton", "./assets/commonSounds/mainButton.mp3")
                .add("takeWin", "./assets/commonSounds/takeWin.mp3")
                .add("volume", "./assets/commonSounds/volume.mp3");

            PIXI.loader.on("complete", this.onLoad.bind(this));
            PIXI.loader.load();
        }

        private onLoad(): void {
            this.sendNotification(Notifications.RESOURCES_LOADED);
        }
    }
}
