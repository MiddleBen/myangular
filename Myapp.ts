function TodoCtrl($scope: Scope) {
  $scope.setAttr('todos', []);
  $scope.setAttr('add', function () {
    $scope.getAttr('todos').push($scope.getAttr('todo'));
    //$scope.setAttr('todo', '');
  });
}

Register.registe('TodoCtrl', TodoCtrl);

DOMResolver.bootstrap();