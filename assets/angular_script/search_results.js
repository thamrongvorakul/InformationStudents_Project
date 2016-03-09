var app = angular.module('search_results', ['ngFileUpload'  ,'ngSanitize','LocalStorageModule' ]);

app.controller('search_resultsController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce' ,
  function ( $scope, $rootScope, $http   ,localStorageService , $sce)
  {

    $scope.keyword = localStorageService.get('keyword_search');
    $scope.fullname_user = localStorageService.get('Fullname_User');

    
  }]);
