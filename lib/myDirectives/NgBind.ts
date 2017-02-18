class NgBind implements IDirective {

    scope: boolean = false;

    init(el: Element, scope: Scope, value: any): void {
        el.innerHTML = scope.scopeEval(value);
        let watch: Watcher = new Watcher();
        watch._express = value;
        watch._action = function (value) {
            el.innerHTML = value;
        };
        scope.addWatcher(watch);
    };
}

Register.registe("ng-bind", new NgBind());