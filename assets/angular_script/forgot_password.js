'use strict';


angular.module('forgot_password',[])
  .controller('forgotpasswordController', ['$scope','$window', '$http', function($scope, $window, $http)
  {
      $scope.email_forgot = '';


      $scope.forgot_password_click = function (){

          var jsonData = {
            "header" :{
              "index" : "user",
              "type" : "login"
            },
            "data" : {
              "email_id" : $scope.email_forgot
            }
          };

          $http.post('/search_data_password', jsonData)
          .success(function(data, status, headers, config)
          {
              $window.alert('Send password complete');
              //console.log(data[0]._source.password)
          })
          .error(function(data, status, headers, config)
          {
          });

          };
    }]);
