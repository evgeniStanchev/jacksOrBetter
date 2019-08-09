///<reference path="../State.ts"/>

namespace server {
    import State = poker.State;

    export class Request {
        private _state: State;

        constructor(state: State) {
            this._state = state;
        }

        public get state(): State {
            return this._state;
        }
    }
}
