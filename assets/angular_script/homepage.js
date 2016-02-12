'use strict';


angular.module('homepage', [])
.controller('homepageController', ['$scope','$window', '$http', function($scope, $window, $http)
{

    $scope.status_login = '';
    $scope.user_email = '';

    $scope.init = function (email){
      $scope.user_email = email;

    };

    if ($scope.user_email !== 'undefined'){
      $scope.status_log = 'Log Out';
    }

    $scope.lecturer_click = function (){

      location.href = 'contacts_Lec';
    };

    $scope.subject_click = function (){
      location.href = 'students_sub';

    };

    $scope.login_click = function (status_log){
      if (status_log === 'Log In'){location.href = '/login';}
      else if (status_log === 'Log Out'){location.href = '/logout'}
    };

    $scope.management_click = function (){
      //$scope.user_mail = email;
      location.href = 'lecturer_mng_sub';
    };

}]);
