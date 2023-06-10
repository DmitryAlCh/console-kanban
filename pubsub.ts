export class PubSub {
    private subscribers: Map<string, Array<(data: any) => void>>;
    constructor() {
        this.subscribers = new Map();
    }
    public subscribe(eventType: string, cb: (data: any) => void): void {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType).push(cb);
    }
    public unSubscribe(eventType: string, cb: (data: any) => void): void {
        if(Array.isArray(this.subscribers.get(eventType))) {
            const idx = this.subscribers.get(eventType).findIndex((fn) => fn  === cb);
            if (idx > -1) {
                this.subscribers.get(eventType).splice(idx, 1);
            } 
        }
    }
    public notify(eventType: string, data: any): void {
        if (this.subscribers.has(eventType)) {
            for (const callback of this.subscribers.get(eventType)) {
                callback(data);
            }
        }
    }
}

