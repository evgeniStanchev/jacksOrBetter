///<reference path="../views/InfoView.ts"/>
namespace controllers {
    import InfoView = views.InfoView;

    export class InfoController extends Pluck.ViewController {
        constructor() {
            //TODO balance must be received from server
            super(new InfoView());
        }
    }
}

