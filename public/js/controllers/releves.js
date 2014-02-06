'use strict';

var MILLISECOND = 1;
var SECOND = MILLISECOND * 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

var TIMEREFERENCE = SECOND;

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
            var relevePrev = releves[0];
            relevePrev.t = (new Date(relevePrev.created)).getTime();
            var releveCum = []
            for (var i = 0; i < releves.length; i++) {
                if (i > 0) {
                    var releve = releves[i];
                    releve.t = (new Date(releve.created)).getTime();
                    releve.timeElasped = releve.t - relevePrev.t;
                    releve.hcMoy = TIMEREFERENCE * (releve.hc - relevePrev.hc) / releve.timeElasped;
                    releve.hpMoy = TIMEREFERENCE * (releve.hp - relevePrev.hp) / releve.timeElasped;
                    releveCum[i-1] = releve;
                    relevePrev = releve;
                }
            }

            $scope.xkey = 'created';      
            $scope.ykeys = ['hcMoy', 'hpMoy'];
            $scope.labels = ['heure creuse', 'heure pleine'];
            $scope.data = releveCum;
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