(function () {

    var petController = function ($scope, $http, NgTableParams, petFactory, $sessionStorage, $location) {

      $scope.$storage = $sessionStorage;

      $scope.pets = {};
      $scope.pet = {
          tags: [],
          photoUrls: []
      };

      $scope.categories = [
        { id: 1, name: 'Dog' },
        { id: 2, name: 'Cat' },
        { id: 3, name: 'Puppy' }
      ];

      $scope.statuses = [
        'AVAILABLE',
        'PENDING',
        'SOLD'
      ];

      var gridSearchParams = {};

      $scope.petGridTable = new NgTableParams({ page: 1, count: 10 }, {
          getData: function (gridParams) {

              if(!$scope.$storage.authenticated) {
                $scope.logout();
                return;
              }

              $scope.loading = true;

              angular.copy(gridParams.filter(), gridSearchParams);

              gridSearchParams.page = gridParams.page();
              gridSearchParams.size = gridParams.count();

              if (!angular.equals({}, gridParams.sorting())) {
                  var key = Object.keys(gridParams.sorting())[0];
                  gridSearchParams.sort = key + ',' + gridParams.sorting()[key];
              }

              return petFactory.getPets(gridSearchParams, $scope.$storage.token.access_token).then(function (response) {

                  $scope.loading = false;
                  gridParams.total(response.data.totalElements);
                  return response.data.content;

              }, function error(e) {
                handleError(e);
              });
          }
      });

      $scope.editPet = function(pet) {
          $scope.pet = pet;
      };

      $scope.reset = function() {
          $scope.pet = {
              tags: [],
              photoUrls: []
          };
      };

      $scope.logout = function() {
        delete $scope.$storage.authenticated;
        delete $scope.$storage.token;
        delete $scope.$storage.user;
        $location.path('/');

      };

      $scope.updatePet = function(pet) {

          if(angular.isDefined(pet.id)) {
            $scope.putPet(pet);
          } else {
            $scope.addPet(pet);
          }
      };

      $scope.addPet = function(pet) {

        petFactory.createPet(pet, $scope.$storage.token.access_token).then(function() {
            $scope.petGridTable.reload();
            $scope.reset();
        }, function error(e) {
          handleError(e);
        });

      };

      $scope.putPet = function(pet) {

        petFactory.updatePet(pet, $scope.$storage.token.access_token).then(function() {
            $scope.petGridTable.reload();
            $scope.reset();
        }, function error(e) {
          handleError(e);
        });
      };

      $scope.deletePet = function(pet) {

          if(confirm('Are you sure you want to delete '+pet.name)) {

            petFactory.deletePet(pet.id, $scope.$storage.token.access_token).then(function() {
                $scope.petGridTable.reload();
                $scope.reset();
            }, function error(e) {
              handleError(e);
            });

          }
      };

      function handleError(e) {

        if(e.status === 403) {
          alert('Forbidden, you cannot do this action');
        }
        if(e.status === 401) {
          $scope.logout();
        }
        if(e.status === 400 || e.status === 500) {
          alert('Something went wrong in the service call');
        }
      }

    };

    angular.module('theBlueCabrio').controller('petController', petController);

})();
