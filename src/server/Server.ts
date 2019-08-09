///<reference path="./Request.ts"/>
///<reference path="./Response.ts"/>
///<reference path="../State.ts"/>
namespace server {

    import Request = server.Request;
    import Response = server.Response;
    import State = poker.State;

    export class Server {

        private _state : State;
        private _balance : number;

        constructor(balance : number) {
            this._balance = balance;
            this._state = State.COLLECT;
        }

        public request(request: Request){
            
        }


    }
}
