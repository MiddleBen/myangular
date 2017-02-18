class NgController implements IDirective {

    scope: boolean = true;

    init(el: Element, scope: Scope, value: any): void {
       var ctrl = Register.get(value + Register.DIRECTIVES_SUFFIX);
       Register.invoke(ctrl, { $scope: scope });
    };
};

Register.registe("ng-controller", new NgController());