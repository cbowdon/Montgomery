interface EventHandler<T> {
    (evt: T): void;
}

class Publisher<T> {

    private handlers: EventHandler<T>[] = [];

    subscribe(handler: EventHandler<T>) {
        this.handlers.push(handler);
    }

    publish(t: T) {
        this.handlers.forEach(h => h(t));
    }
}
