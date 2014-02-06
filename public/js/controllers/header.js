'use strict';

angular.module('edf.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Ajouter un relevé',
        'link': ''
    },{
        'title': 'Relevés',
        'link': 'releves'
    },{
        'title': 'Graphique',
        'link': 'releves/chart'
    }];
}]);