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
          location.href = "/";
      })
      .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
          $scope.wrong_password = "ชื่อผู้ใช้งาน หรือรหัสผ่านผิดพลาด";
      }
      })
    }

    $scope.changepath_to_forgotpassword =  function(){
        location.href = "forgot_password";
    };

    $scope.changepath_to_register =  function(){
        location.href = "register";
    };


  }]);
