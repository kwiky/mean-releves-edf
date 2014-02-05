'use strict';

angular.module('edf.releves').controller('RelevesController', ['$scope', '$routeParams', '$location', 'Global', 'Releves', 
    function ($scope, $routeParams, $location, Global, Releves) {
    $scope.global = Global;

    $scope.create = function() {
        var releve = new Releves({
            hc: this.hc,
            hp: this.hp
        });
        releve.$save(function(response) {
            $location.path('releves/' + response._id);
        });

        this.hc = '';
        this.hp = '';
    };

    $scope.find = function() {
        Releves.query(function(releves) {
            $scope.releves = releves;
        });
    };
}]);