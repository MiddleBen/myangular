class NgRepeat implements IDirective {

    scope: boolean = false;

    init(el: Element, scope: Scope, value: any): void {
        let scopes = [];
        let parts = value.split('in');
        let collectionName = parts[1].trim();
        let itemName = parts[0].trim();
        let parentNode = el.parentNode;

        function render(val) {
            var els = val;
            var currentNode;
            var s;
            while (parentNode.firstChild) {
                parentNode.removeChild(parentNode.firstChild);
            }
            scopes.forEach(function (s) {
                s.destroy();
            });
            scopes = [];
            els.forEach(function (val) {
                currentNode = el.cloneNode();
                currentNode.removeAttribute('ng-repeat');
                currentNode.removeAttribute('ng-scope');
                let s: Scope = scope.clone();
                scopes.push(s);
                s.setAttr(itemName, val);
                DOMResolver.compile(currentNode, s);
                parentNode.appendChild(currentNode);
            });
        }
        var watch = new Watcher();
        watch._express = collectionName;
        watch._action = render;
        scope.addWatcher(watch);
        render(scope.scopeEval(collectionName));
    };
}
Register.registe("ng-repeat", new NgRepeat());
