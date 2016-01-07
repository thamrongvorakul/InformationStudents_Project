'use strict';


angular.module('homepage', [])
.controller('homepageController', ['$scope','$window', '$http', function($scope, $window, $http)
{
    $scope.lecturer_click = function (){
      location.href = 'contacts_Lec';
    };

    $scope.subject_click = function (){
      location.href = 'students_sub';

    };

    $scope.login_click = function (){
      location.href = 'login';
    };

    $scope.management_click = function (){
      location.href = 'lecturer_mng_sub';
    };

}]);
