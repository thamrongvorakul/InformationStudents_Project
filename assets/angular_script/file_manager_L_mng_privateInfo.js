'use strict';


angular.module('privateinfoController',[])
  .controller('loginController', ['$scope','$window', '$http', function($scope, $window, $http)
  {
      $scope.Fname = '';
      $scope.Lname = '';
      $scope.tel = '';
      $scope.email = '';
      $scope.room = '';


      $scope.cancel_click = function(){
        "Fname" : $scope.Fname ,
        "Lname" : $scope.Lname ,
        "Tel" : $scope.tel ,
        "email_id" : $scope.email,
        "room" : $scope.room
      };

      $scope.save_click = function(){
        var jsonData = {
          "header" : {"index" : "teacher"},
          "data" : {

          }
        }

      }

  }]);
