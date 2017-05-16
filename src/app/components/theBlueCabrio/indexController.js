(function () {

    var indexController = function ($scope, $http, NgTableParams, petFactory, $sessionStorage, $httpParamSerializerJQLike, $location) {

      $scope.$storage = $sessionStorage;

      $scope.logout = function() {
        delete $scope.$storage.authenticated;
        delete $scope.$storage.token;
        delete $scope.$storage.user;
      };

      $scope.login = function() {

          $http({
            method: 'POST',
            url: 'http://localhost:8080/oauth/token',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $httpParamSerializerJQLike({
              client_id: 'petshop',
              grant_type: 'password',
              scope: 'petshop',
              username: $scope.username,
              password: $scope.password
            })

          }).then(function success(response) {

              $scope.$storage.authenticated = true;
              $scope.$storage.token = response.data;

              $location.path('/pets');

          }, function error(e) {
              alert('Unable to log in');
              delete $scope.$storage.authenticated;
          });
      };

    };

    angular.module('theBlueCabrio').controller('indexController', indexController);

})();
