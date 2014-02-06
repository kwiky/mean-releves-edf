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

    $scope.chart = function() {
        Releves.query(function(releves) {
            $scope.xkey = 'created';      
            $scope.ykeys = ['hc', 'hp'];
            $scope.labels = ['heure creuse', 'heure pleine'];
            $scope.releves = releves;
        });
    }

    $scope.remove = function(releve) {
        if (releve) {
            releve.$remove();

            for (var i in $scope.releves) {
                if ($scope.releves[i] === releve) {
                    $scope.releves.splice(i, 1);
                }
            }
        }
        else {
            $scope.releve.$remove();
            $location.path('releves');
        }
    };
}]);