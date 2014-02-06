'use strict';

//Setting up route
angular.module('edf').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/releves/index.html'
        }).
        when('/releves', {
            templateUrl: 'views/releves/list.html'
        }).
        when('/releves/chart', {
            templateUrl: 'views/releves/chart.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('edf').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);