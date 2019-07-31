namespace poker.model {
    export class GameModel extends Pluck.Model {

        constructor() {
            super()
        }

        balance: number  = 5000
        cards: number[]
    }

}