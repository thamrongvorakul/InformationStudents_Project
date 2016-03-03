'use strict';
angular.module('homepage', ['LocalStorageModule'])
.controller('homepageController', ['$scope','$window', '$http', 'localStorageService' , function($scope, $window, $http , localStorageService)
{

    $scope.user_email = '';
    $scope.management_2 = '';
    $scope.init = function (email ,management ,title_user , FName , LName){
      $scope.user_email = email;
      localStorageService.set('title_user' , title_user);
      localStorageService.set('FName' , FName);
      localStorageService.set('LName' , LName);
      localStorageService.set('management' , management);
      $scope.management_2 = management;
    };
    console.log(localStorageService.get('Title'));
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
