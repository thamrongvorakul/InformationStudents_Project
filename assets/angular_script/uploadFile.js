
angular.module('uploadFile', ['ngFileUpload' , 'angularFileUpload' ,  'angular-momentjs'])
.controller('uploadfileController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$moment',
  function ( $scope, $rootScope,Upload, $http , FileUploader , $moment )
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
          console.log(data[i]);

          $scope.subject_search.push({subject : data[i]["_source"]["Subject_Name"]})
        }
          console.log("YEAH");
      });

      $scope.changepath_on_combobox = function (){
        if (todoList.fname === "เอกสารประกอบการเรียน"){
          location.href = 'subject_doc_dload2'
        }
        else if (todoList.fname === "การบ้าน"){

          location.href = 'subject_hw_dload2'
        }
        else if (todoList.fname === "อัพเดทข่าวสาร"){
          location.href = 'subject_news_dload2'
        }
        else if (todoList.fname === "คะแนนสอบ"){
          location.href = 'subject_score_dload2'
        }
      };


  }]);
