'use strict';


angular.module('students_sub', [])
.controller('students_subController', ['$scope','$window', '$http', function($scope, $window, $http)
{
    $scope.homework_click = function (){
      location.href = 'students_sub_hw';
    };

    $scope.document_click = function (){
      location.href = 'students_sub_doc';

    };

    $scope.news_click = function (){
      location.href = 'students_sub_news';
    };

    $scope.score_click = function (){
      location.href = 'students_sub_score';
    };

}]);
