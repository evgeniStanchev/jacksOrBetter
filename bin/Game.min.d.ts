declare namespace poker {
    class Notifications {
        static RESOURCES_LOADED: string;
    }
}
declare namespace poker.controllers {
    class GameController extends Pluck.ViewController {
        getInterests(): string[];
        handleNotification(note: Pluck.Notification): void;
    }
}
declare namespace poker {
}
declare namespace poker.model {
    class Resources extends Pluck.Model {
        constructor();
        load(): void;
        private onLoad;
    }
}
