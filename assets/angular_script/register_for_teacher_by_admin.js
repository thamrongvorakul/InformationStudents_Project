'use strict';


var app = angular.module('register_for_teacher', []);
app.controller('register_for_teacherController', ['$scope','$window', '$http', function($scope, $window, $http)
{
  $scope.Title = '';
  $scope.email_id = '';
  $scope.FName = '';
  $scope.LName = '';
  $scope.password = '';

  $scope.register_click = function (){
     var jsonData  = {
       "header" : {"index" : "user" , "type" : "login"},
       "data" : {
            "Type_User" : "teacher" ,
            "ID_NO" : " ",
            "Title" : $scope.Title ,
            "FName" : $scope.FName,
            "LName" : $scope.LName,
            "email_id" : $scope.email_id,
            "password" : $scope.password
          }
    };
   $http.post('/insert_user_data', jsonData).success(function(data, status, headers, config)
            {
              $window.alert('Register Complete');
            })
            .error(function(data, status, headers, config)
            {
            });
  };

  $scope.changepath =  function(){
      location.href = "login";
  };


}]);
