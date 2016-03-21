var app = angular.module('search_results', ['ngFileUpload'  ,'ngSanitize','LocalStorageModule' ]);

app.controller('search_resultsController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce' ,
  function ( $scope, $rootScope, $http   ,localStorageService , $sce)
  {

    $scope.keyword = localStorageService.get('keyword_search');
    $scope.fullname_user = localStorageService.get('Fullname_User');
    $scope.keyword_search = '';
    $scope.search_click = function (){
      localStorageService.set('keyword_search' , $scope.keyword_search);
      $scope.keyword = localStorageService.get('keyword_search');
      $http.post('/search_data_by_keyword_subject' , {keyword : $scope.keyword})
      .success(function(data){
        $scope.search_results_arr = [];
        $scope.count = data.length;
        for (var i =0 ; i< data.length ; i++){
          $scope.search_results_arr.push({data : data[i]});
        }
        location.reload();
      })

    };

    $http.post('/search_data_by_keyword_subject' , {keyword : $scope.keyword})
    .success(function(data){
      $scope.search_results_arr = [];
      $scope.count = data.length;
      console.log(data.length);
      for (var i =0 ; i< data.length ; i++){
        $scope.search_results_arr.push({data : data[i]});
      }
    })
    $scope.link_click = function( sub_name , sub_term , sub_year , lec_name){
      localStorageService.set("select_sub_name", sub_name);
      localStorageService.set("select_term", sub_term);
      localStorageService.set("select_year", sub_year);
      localStorageService.set("select_lecturer_name" , lec_name);
      var data = {
        year : sub_year,
        term : sub_term,
        subject_name : sub_name
      };
      $http.post('/update_view_subject' , data).success(function(data){

      })
      location.href = "/student_subject" ;
    }
  }]);
