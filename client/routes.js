angular.module("socially").run(["$rootScope", "$location", function ($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function (event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go("dashboard.parties");
    }
  });
}]);

angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('dashboard.home');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'client/core/views/dashboard/main.html',
        abstract: true
      })
      .state('dashboard.home', {
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'client/core/views/dashboard/home.html'
      })
      .state('dashboard.form', {
        templateUrl: 'client/core/views/form.html',
        url: '/form'
      })
      .state('dashboard.blank', {
        templateUrl: 'client/core/views/pages/blank.html',
        url: '/blank'
      })
      .state('dashboard.chart', {
        templateUrl: 'client/core/views/chart.html',
        url: '/chart',
        controller: 'ChartCtrl'
      })
      .state('dashboard.table', {
        templateUrl: 'client/core/views/table.html',
        url: '/table'
      })
      .state('dashboard.panels-wells', {
        templateUrl: 'client/core/views/ui-elements/panels-wells.html',
        url: '/panels-wells'
      })
      .state('dashboard.buttons', {
        templateUrl: 'client/core/views/ui-elements/buttons.html',
        url: '/buttons'
      })
      .state('dashboard.notifications', {
        templateUrl: 'client/core/views/ui-elements/notifications.html',
        url: '/notifications'
      })
      .state('dashboard.typography', {
        templateUrl: 'client/core/views/ui-elements/typography.html',
        url: '/typography'
      })
      .state('dashboard.icons', {
        templateUrl: 'client/core/views/ui-elements/icons.html',
        url: '/icons'
      })
      .state('dashboard.grid', {
        templateUrl: 'client/core/views/ui-elements/grid.html',
        url: '/grid'
      })
      .state('dashboard.parties', {
        url: '/parties',
        templateUrl: 'client/parties/views/parties-list.html',
        controller: 'PartiesListCtrl'
      })
      .state('dashboard.partyDetails', {
        url: '/parties/:partyId',
        templateUrl: 'client/parties/views/party-details.html',
        controller: 'PartyDetailsCtrl',
        resolve: {
          "currentUser": ["$meteor", function ($meteor) {
            return $meteor.requireUser();
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/users/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'client/users/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc'
      })
      .state('resetpw', {
        url: '/resetpw',
        templateUrl: 'client/users/views/reset-password.html',
        controller: 'ResetCtrl',
        controllerAs: 'rpc'
      })
      .state('logout', {
        url: '/logout',
        resolve: {
          "logout": ['$meteor', '$state', function ($meteor, $state) {
            return $meteor.logout().then(function () {
              $state.go('dashboard.parties');
            }, function (err) {
              console.log('logout error - ', err);
            });
          }]
        }
      })
      .state('404', {
        url: '/404',
        templateUrl: 'client/core/views/404.html'
      });
  }
]);