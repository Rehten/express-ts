export class Queue<T> {
    private _store: T[] = [];

    constructor(initialData: Array<T> = []) {
        this._store.push(...initialData);
    }

    push(val: T): void {
        this._store.push(val);
    }

    pop(): T {
        return this._store.shift() as T;
    }

    size(): number {
        return this._store.length;
    }

    isEmpty(): boolean {
        return (this.size() === 0);
    }
}