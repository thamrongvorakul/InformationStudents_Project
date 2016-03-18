
angular.module('select_subject_term', [ 'angular-momentjs','LocalStorageModule','angular.filter'])
.controller('select_subject_termController', ['$scope', '$http' , '$moment','localStorageService' ,
  function ( $scope, $http  , $moment ,  localStorageService)
  {
      $scope.subject_name_select = '';
      $scope.subject_term = '';
      $scope.subject_year= '';
      $scope.lec_name_search = '';
      $scope.subject_name_arr = [];
      $http.post('/get_subject_all')
      .success(function(data){
        for (var i=0 ; i<data.length ; i++){
          $scope.subject_name_arr.push({subject : data[i]["_source"]["Subject_Name"]});
        }
      });

      $scope.change_subject = function (){
        var data = {subject_name : $scope.subject_name_select};
        $scope.term_year_arr = [];
        $http.post('/get_term_year' , data)
        .success(function(data){
          for (var i=0 ; i< data.length ; i++){
            $scope.term_year_arr.push({data : data[i]['_source']['Term'],
                                        data2 : data[i]['_type']})
          }
        });
      };

      $scope.change_get_lecturer_name = function(){
          var data = {
            subject_name : $scope.subject_name_select,
            subject_term : $scope.subject_term,
            subject_year : $scope.subject_year
          };
          $http.post('/get_lecturer_name_of_subject' , data)
          .success (function(data){
            $scope.lec_name_search = data[0]["_source"]["Lec_Name"];
          });
      };

      $scope.submit_click = function (){
        localStorageService.set("select_sub_name", $scope.subject_name_select);
        localStorageService.set("select_term", $scope.subject_term);
        localStorageService.set("select_year", $scope.subject_year);
        localStorageService.set("select_lecturer_name" , $scope.lec_name_search);
        
        var data = {
          year : $scope.subject_year,
          term : $scope.subject_term,
          subject_name : $scope.subject_name_select
        };
        $http.post('/update_view_subject' , data).success(function(data){

        })
        location.href = 'student_subject';
      };
  }]);
