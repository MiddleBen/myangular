class NgModel implements IDirective {

    scope: boolean = false;

    init(el: HTMLInputElement, scope: Scope, value: any): void {
        el.addEventListener('keyup', function () {
            scope.setAttr(value, el.value);
            scope.digest();
        });

        let watcher: Watcher = new Watcher();
        watcher._express = value;
        watcher._action = function (value) {
            el.nodeValue = value;
        }
        scope.addWatcher(watcher);
    };
}

Register.registe("ng-model", new NgModel());