'use strict';
angular.module('homepage', ['LocalStorageModule'])
.controller('homepageController', ['$scope','$window', '$http', 'localStorageService' , function($scope, $window, $http , localStorageService)
{

    $scope.user_email = '';
    $scope.management_2 = '';
    $scope.keyword_search = '';
    localStorageService.remove('times_homework_select');

    $scope.search_click = function (){
      localStorageService.set('keyword_search' , $scope.keyword_search);
      location.href = "search_results";
    };
    $http.post('/search_data_for_latest_topic')
    .success(function(data){
      $scope.latest_topic_arr = [];
      for (var i=0 ; i<data.length ; i++){
        $scope.latest_topic_arr.push({data : data[i]});

      }
    });
    $scope.latest_click = function(lec_name , term , year , sub_name){
      localStorageService.set("select_sub_name", sub_name);
      localStorageService.set("select_term", term);
      localStorageService.set("select_year", year);
      localStorageService.set("select_lecturer_name" , lec_name);
      location.href = "/student_subject";
    };
    $http.post('/search_data_for_hottest_topic')
    .success(function(data){
      $scope.hottest_topic_arr = [];
      for (var i=0 ; i<data.length ; i++){
        $scope.hottest_topic_arr.push({data : data[i]});
      }
    });
    $scope.init = function (email ,management ,title_user , FName , LName , ID_NO , create_sub , create_lec){
      $scope.user_email = email;
      
      localStorageService.set('title_user' , title_user);
      localStorageService.set('FName_User' , FName);
      localStorageService.set('LName_User' , LName);
      localStorageService.set('management' , management);
      localStorageService.set('Email_User' , email);
      var Fullname = title_user+FName+" "+LName;
      localStorageService.set('Fullname_User', Fullname );
      localStorageService.set('ID_NO_Std' ,ID_NO )
      $scope.management_2 = management;
      $scope.create_sub = create_sub;
      $scope.create_lec = create_lec;
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
