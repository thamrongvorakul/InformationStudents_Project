'use strict';


var app = angular.module('register', []);
app.controller('registerController', ['$scope','$window', '$http', function($scope, $window, $http)
{
  $scope.id_no = '';
  $scope.email_id = '';
  $scope.FName = '';
  $scope.LName = '';
  $scope.password = '';
  $scope.password_check = '';

  $scope.register_click = function (){
     var jsonData  = {
        "header" : {"index" : "user" , "type" : "login"},
        "data" : {
            "Type_User" : "student",
            "ID_NO" : $scope.id_no ,
            "Title" : " ",
            "FName" : $scope.FName,
            "LName" : $scope.LName,
            "email_id" : $scope.email_id,
            "password" : $scope.password,
            "status_login" : 0
        }
    };
   $http.post('/insert_user_data', jsonData).success(function(data, status, headers, config)
            {
              $window.alert('Register Complete');
              location.href = "/";
            })
            .error(function(data, status, headers, config)
            {
            });
  };

  $scope.changepath =  function(){
      location.href = "login";
  };


}]);
