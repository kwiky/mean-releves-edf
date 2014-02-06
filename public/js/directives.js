'use strict';

angular.module('edf').directive('linechart', function() {    
    return {
        // required to make it work as an element
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        // observe and manipulate the DOM
        link: function($scope, element, attrs) {
            var setData = function() { 
                var data = $scope[attrs.data],
                    xkey = $scope[attrs.xkey],
                    ykeys= $scope[attrs.ykeys],
                    labels= $scope[attrs.labels];
                if (data) {
                    Morris.Line({
                        element: element,
                        data: data,
                        xkey: xkey,
                        ykeys: ykeys,
                        labels: labels
                    });
                }
            };

            //lets just observe only the data because it is bad to use many observers, anyway this won't work without supplied data
            //attrs.$observe('data', setData);
            $scope.$watch(attrs.data, setData);
        }
    };
});