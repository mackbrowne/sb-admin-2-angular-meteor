angular.module('socially').controller('RegisterCtrl', ['$meteor', '$state',
  function ($meteor, $state) {
    let vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.error = '';

    vm.register = function () {
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