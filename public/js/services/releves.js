'use strict';

//Releves service used for releves REST endpoint
angular.module('edf.releves').factory('Releves', ['$resource', function($resource) {
    return $resource('releves/:relevesId', {
        relevesId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);