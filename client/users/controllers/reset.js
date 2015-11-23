angular.module('socially').controller('ResetCtrl', ['$meteor', '$state',
  function ($meteor, $state) {
    let vm = this;

    vm.credentials = {
      email: ''
    };

    vm.error = '';

    vm.reset = function () {
      $meteor.forgotPassword(vm.credentials.email).then(
        function () {
          $state.go('dashboard.parties');
        },
        function (err) {
          vm.error = 'Error sending forgot password email - ' + err;
        }
      );
    };
  }
]);