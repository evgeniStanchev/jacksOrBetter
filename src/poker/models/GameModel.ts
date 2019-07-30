namespace poker.model {
    export class GameModel extends Pluck.Model {

        constructor() {
            super()
        }

        balance: number
        cards: number[]
    }

}