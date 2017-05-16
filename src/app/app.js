(function () {

    angular.module('theBlueCabrio', [
        'ngRoute',
        'ngSanitize',
        'ngTable',
        'ngStorage'
      ]);

    /**
   * Main application routing and configuration
   *
   * @param routeProvider
   *
   * @ngInject
   */
    var theBlueCabrioConfig = function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'indexController'
      })
      .when('/pets', {
        templateUrl: 'views/pet.html',
        controller: 'petController'
      })
      .otherwise({
        templateUrl: 'views/404.html'
      });

    };

    /**
    * Sets up application configuration
    */
    angular.module('theBlueCabrio').config(theBlueCabrioConfig);

})();
