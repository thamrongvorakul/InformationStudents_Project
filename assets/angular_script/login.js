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
        
          if (data[0]._source.password === $scope.password)
          {
            $scope.long_password = '';
            location.href = "/";
          }
          else {
            $scope.long_password = "รหัสผ่านผิดพลาด";
          }



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
