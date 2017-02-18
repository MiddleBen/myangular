interface IDirective {

    scope: boolean;

    init(el: Element, scope: Scope, value: any): void;
    
}