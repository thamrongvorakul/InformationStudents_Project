
angular.module('uploadFile', ['ngFileUpload' , 'angularFileUpload' ,  'angular-momentjs','LocalStorageModule','angular.filter'])
.controller('uploadfileController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$moment','localStorageService' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader , $moment ,  localStorageService)
  {
      var todoList = this;
      todoList.todos = [];
      todoList.feedname = [];
      todoList.fname = [];
      var radiovalue = '';
      todoList.nameupload = 'No File Chosen.';
      $scope.name_of_file = '';

      $scope.detail = '5555';
      $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
      $scope.date_hw = "11-11-1111";
      $scope.button_file_name = '';

      $scope.subject_name_select = '';
      $scope.term = '';
      $scope.year = '';

      $scope.change_subject = function (){
        var data = {
          subject_name : $scope.subject_name_select
        };
        $scope.term_year_arr = [];
        $http.post('/get_term_year' , data)
        .success(function(data){
          for (var i=0 ; i< data.length ; i++){
            $scope.term_year_arr.push({data : data[i]['_source']['Term'],
                                        data2 : data[i]['_type']})
          }
        });
      };


      if ($scope.subject_name_select !== ''){
        var data = {
          subject : $scope.subject_name_select
        };
        $http.post('/get_term_and_year' , data)
        .success(function(data){
        })
      }


      $http.get('/getdata_on_combobox')
      .success(function(data, status, headers, config)
      {
        for(var i=0;i<data.length;i++)
        {
              todoList.feedname.push({name : data[i]['Feed_Name']});
        }
      }).error(function(data, status, headers, config)
      {
      });

      var data = {
        "index" : "subject",
        "Lec_Name" : "Archarn.Anek Thamrongvorakul"
      };

      $scope.subject_search = [];
      $http.post('/getdata_on_subject_search' , data)
      .success (function(data){
        for (var i=0 ;i< data.length ; i++){
          $scope.subject_search.push({subject : data[i]["_source"]["Subject_Name"]})
        }
      });

      $scope.changepath_on_combobox = function (){
        if (todoList.fname === "เอกสารประกอบการเรียน"){
          localStorageService.set("subject_name", $scope.subject_name_select);
          localStorageService.set("term", $scope.term);
          localStorageService.set("year", $scope.year);
          location.href = 'subject_doc_dload2'
        }
        else if (todoList.fname === "การบ้าน"){
          localStorageService.set("subject_name", $scope.subject_name_select);
          localStorageService.set("term", $scope.term);
          localStorageService.set("year", $scope.year);
          location.href = 'subject_hw_dload2'
        }
        else if (todoList.fname === "อัพเดทข่าวสาร"){
          localStorageService.set("subject_name", $scope.subject_name_select);
          localStorageService.set("term", $scope.term);
          localStorageService.set("year", $scope.year);
          location.href = 'subject_news_dload2'
        }
        else if (todoList.fname === "คะแนนสอบ"){
          localStorageService.set("subject_name", $scope.subject_name_select);
          localStorageService.set("term", $scope.term);
          localStorageService.set("year", $scope.year);
          location.href = 'subject_score_dload2'
        }
      };


  }]);
