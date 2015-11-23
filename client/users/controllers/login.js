angular.module('socially').controller('LoginCtrl', ['$meteor', '$state',
  function ($meteor, $state) {
    let vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.error = '';

    vm.login = function () {
      $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
        function () {
          $state.go('dashboard.parties');
        },
        function (err) {
          vm.error = 'Login error - ' + err;
        }
      );
    };
  }
]);