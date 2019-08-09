///<reference path="../views/InfoView.ts"/>
namespace controllers {
    import ActionView = views.InfoView;

    export class ActionController extends Pluck.ViewController {
        constructor() {
            //TODO balance must be received from server
            super(new ActionView());
        }
    }
}

