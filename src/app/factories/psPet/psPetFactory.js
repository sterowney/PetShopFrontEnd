(function () {
    'use strict';

    /**
     * @method psPetFactory
     *
     * @ngInject
     */
    var petFactory = function ($http, $sessionStorage) {

        var baseUrl = 'http://localhost:8080/pet/';
        var obj = {};
        var timeoutDuration = 3000;

        obj.getPets = function (params, token) {
            return $http({
                      method: 'GET',
                      url: baseUrl,
                      params: params,
                      timeout: timeoutDuration,
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                      }
                  });
        };

        obj.getPet = function (petId, token) {
          return $http({
                    method: 'GET',
                    url: baseUrl + petId,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                    }
                });
        };

        obj.deletePet = function (petId, token) {
          return $http({
                  method: 'DELETE',
                  url: baseUrl + petId,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
                });
        };

        obj.updatePet = function (pet, token) {
          return $http({
                  method: 'PUT',
                  data: pet,
                  url: baseUrl + pet.id,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
                });
        };

        obj.createPet = function (pet, token) {
          return $http({
                  method: 'POST',
                  data: pet,
                  url: baseUrl,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
                });
        };

        return obj;
    };

    angular.module('theBlueCabrio').factory('petFactory', petFactory);

})();
