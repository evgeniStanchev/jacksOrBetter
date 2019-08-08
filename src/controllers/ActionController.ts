///<reference path="../views/ActionView.ts"/>
namespace controllers {
    import ActionView = views.ActionView;

    export class ActionController extends Pluck.ViewController {
        constructor() {
            //TODO balance must be received from server
            super(new ActionView());
        }
    }
}
