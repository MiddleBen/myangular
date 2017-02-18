class NgClick implements IDirective {

    scope: false;
    init(el: Element, scope: Scope, value: any): void {
        el.addEventListener('click', function () {
            scope.scopeEval(value);
            scope.digest();
        });
    };
}

Register.registe("ng-click", new NgClick());