class Scope {

    private static counter = 0;
    private _id: number;
    private _parent: Scope;
    private _children: Array<Scope> = [];
    private _watchers: Array<Watcher> = [];
    private _attr: { [key: string]: any;} = {};

    public setAttr(key: string, value: any) {
        this._attr[key] = value;
    };

    public getAttr(key: string) {
        return this._attr[key];
    }

    constructor (parent: Scope) {
        this._parent = parent;
    }

    public addWatcher (watcher: Watcher) {
        this._watchers.push(watcher);
    }

    public scopeEval (expression: any) {
        if (typeof expression == 'function') {

            return expression.call(this);
        } else {
            return eval("this._attr." + expression);
        }
    }

    public clone (): Scope {


        Scope.counter ++;
        let newScope: Scope = new Scope(this);
        return newScope;
    }

    public destroy() {
        let brothers = this._parent._children;
        brothers.splice(brothers.indexOf(this), 1);
    }

    public digest() {
        let currentVal: any, watcher: Watcher, dirty: boolean = true, i = 0;
        while (dirty) {
            dirty = false;
            for (i; i < this._watchers.length; i ++) {
                watcher = this._watchers[i];
                currentVal = this.scopeEval(watcher._express);
                if (watcher._lastVal != currentVal) {
                    watcher._lastVal = JSON.parse(JSON.stringify(currentVal));
                    dirty = true;
                    watcher._action(currentVal);
                }
            }
        }
    }

}