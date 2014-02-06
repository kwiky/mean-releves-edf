'use strict';

angular.module('edf.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '<i class="fa fa-plus"></i> Ajouter un relevé',
        'link': ''
    },{
        'title': '<i class="fa fa-th-list"></i> Relevés',
        'link': 'releves'
    },{
        'title': '<i class="fa fa-signal"></i> Graphique',
        'link': 'releves/chart'
    }];
}]);