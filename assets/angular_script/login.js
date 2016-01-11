'use strict';


angular.module('login',[])
  .controller('loginController', ['$scope','$window', '$http', function($scope, $window, $http)
  {
    $scope.email_id = '';
    $scope.password = '';
    $scope.long_password = '';



    $scope.login_click = function (){

      var jsonData = {
        "header" : {"index" : "students"},
        "data" : {
          "email_id" : $scope.email_id,
          "password" : $scope.password
        }
      };

      $http.post('/search_data', jsonData)
      .success(function(data, status, headers, config)
      {

          location.href = "/"



      })
      .error(function(data, status, headers, config)
      {
      });

      };


    $scope.changepath_to_forgotpassword =  function(){
        location.href = "forgot_password";
    };

    $scope.changepath_to_register =  function(){
        location.href = "register";
    };


  }]);
