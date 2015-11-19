angular.module("socially").controller("RegisterCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
 
    vm.credentials = {
      email: '',
      password: ''
    };
 
    vm.error = '';
 
    vm.register = function () {
      debugger;
      $meteor.createUser(vm.credentials).then(
        function () {
          $state.go('dashboard.parties');
        },
        function (err) {
          vm.error = 'Registration error - ' + err;
        }
      );
    };
  }
]);