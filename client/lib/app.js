angular.module('socially', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'uiGmapgoogle-maps',
  'angular-loading-bar',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'chart.js'
]);

function onReady() {
  angular.bootstrap(document, ['socially']);


  $(function () {
    $('#side-menu').metisMenu();
  });

  //Loads the correct sidebar on window load,
  //collapses the sidebar on window resize.
  // Sets the min-height of #page-wrapper to window size
  $(function () {
    $(window).bind('load resize', function () {
      let topOffset = 50;
      let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
      if (width < 768) {
        $('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
      } else {
        $('div.navbar-collapse').removeClass('collapse');
      }

      let height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $('#page-wrapper').css('min-height', (height) + 'px');
      }
    });

    let url = window.location;
    let element = $('ul.nav a').filter(function () {
      return this.href === url || url.href.indexOf(this.href) === 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
      element.addClass('active');
    }
  });

}

if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady);
else
  angular.element(document).ready(onReady);