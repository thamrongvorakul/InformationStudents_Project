'use strict';


angular.module('register', [])
.controller('registerController', ['$scope','$window', '$http', function($scope, $window, $http)
{
  $scope.id_no = '';
  $scope.email_id = '';
  $scope.FName = '';
  $scope.LName = '';
  $scope.password = '';
  $scope.password_check = '';




  $scope.register_click = function (){

     var jsonData  = {
        "header" : {"index" : "students" , "type" : "2555"},
        "data" : {
            "ID_NO" : $scope.id_no ,
            "FName" : $scope.FName,
            "LName" : $scope.LName,
            "email_id" : $scope.email_id,
            "password" : $scope.password,
            "status_login" : 0
        }
    };


   $http.post('/bulkinsert', jsonData).success(function(data, status, headers, config)
            {
              $window.alert('Register Complete');
              console.log(data.id);
            })
            .error(function(data, status, headers, config)
            {
            });

  };

  $scope.changepath =  function(){
      location.href = "login";
  };


}]);
