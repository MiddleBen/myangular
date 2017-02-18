class Register {

public static DIRECTIVES_SUFFIX = '-Directive';

private static _cache: { [key: string]: any;} = {$rootScope: new Scope(null)};

public static get (name: string) {
    if (Register._cache[name]) {
        return Register._cache[name];
    }
}

public static registe (name: string, directive: IDirective | Function) {
    Register._cache[name + Register.DIRECTIVES_SUFFIX] = directive;
}

public static getParams(fn: Function) {
    var res = fn.toString()
      .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
      .match(/\((.*?)\)/);
    if (res && res[1]) {
    return res[1].split(',').map(function (d) {
        return d.trim();
    });
    }
    return [];
}

public static invoke (fn: Function, params) {
    let dependences = this.getParams(fn).map(function (s) {
        return params[s];
    }, this);
    return fn.apply(null, dependences);
}

}