class DOMResolver {
    
    public static bootstrap () {
        DOMResolver.compile(document.children[0],
        Register.get('$rootScope'));
    };

    public static compile (el: Element, scope: Scope) {
        let directives = DOMResolver._getElDirectives(el);
        let directive: IDirective;
        let scopeCreated;
        directives.forEach(function (d) {
            directive = Register.get(d.name + Register.DIRECTIVES_SUFFIX);
            if (directive.scope && !scopeCreated) {
                scope = scope.clone();
                scopeCreated = true;
            }
            directive.init(el, scope, d.value);
        });
        Array.prototype.slice.call(el.children).forEach(function (c) {
            DOMResolver.compile(c, scope);
      }, this);
    };

    private static _getElDirectives (el: Element) {
        var attrs = el.attributes;
        var result = [];
        for (let i = 0; i < attrs.length; i++) {
            if (Register.get(attrs[i].name + Register.DIRECTIVES_SUFFIX)) {
                result.push({
                    name: attrs[i].name,
                    value: attrs[i].value
                })
            }
        }
        return result;
    }
}