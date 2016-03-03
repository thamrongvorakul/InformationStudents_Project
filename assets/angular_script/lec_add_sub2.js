var app = angular.module('lectureraddsub', ['ngFileUpload' , 'angularFileUpload' ,'ngSanitize' ]);

app.controller('lectureraddsubController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'$window',
  function ( $scope, $rootScope,Upload, $http , FileUploader  ,$window )
  {
    $scope.term_arr = [];
    $scope.year_arr = [];
    $scope.term_Select = [];
    $scope.year_Select = [];
    $scope.subject_id = '';
    $scope.subject_name = '';
    $scope.Description = '';

    $http.post('/get_data_on_elasticsearch' , {Lec_Name : 'Archarn.Anek Thamrongvorakul'})
    .success (function (data){
        $scope.subject_arr = [];
        for (var i=0 ; i<data.length ; i++){
          $scope.subject_arr.push({data : data[i]})
        }

    });

    $http.get('/getdata_on_term_subject')
    .success(function(data, status, headers, config)
    {
      for(var i=0;i<data.length;i++)
      {
           $scope.term_arr.push({term : data[i]['Term']});
      }
    }).error(function(data, status, headers, config)
    {
    });


    $http.get('/getdata_on_year_subject')
    .success(function(data, status, headers, config)
    {
      for(var i=0;i<data.length;i++)
      {
          console.log(data[i]);
           $scope.year_arr.push({year : data[i]['Year']});
      }
    }).error(function(data, status, headers, config)
    {
    });
    var lec_name = 'Archarn.Anek Thamrongvorakul';
    var lec_name_split = lec_name.split(" ");
    var lec_name_after_split = '';
    for (var i=0 ; i< lec_name_split.length ; i++){lec_name_after_split = lec_name_after_split + lec_name_split[i]};

    $scope.remove_click = function (id,type,sub_name,term){
      console.log(id + "  " + type);
      console.log(sub_name , term);
      var data = {
          "header" : {"type":type , "id" : id},
          "data" : {
            Subject_Name : sub_name,
            Term : term,
            Lec_Name : lec_name_after_split
          }
      };

      $http.post('/delete_subject_on_elasticsearch' , data )
      .success(function(data){
        alert('ลบวิชาที่เลือกเรียบร้อย !!');
        location.reload();
      });

    };

    $scope.subject_add_save_click = function (){

      var data = {
        "header" : {
          "index" : "subject",
          "Year" : $scope.year_Select
        },
        "data" : {
          "Subject_Id" : $scope.subject_id ,
          "Subject_Name" : $scope.subject_name,
          "Term" : $scope.term_Select,
          "Description" : $scope.Description,
          "Lec_Name" : "Archarn.Anek Thamrongvorakul",
          "Created_By" : "Archarn.Anek Thamrongvorakul",
          "Date_Upload" : moment().format('MMMM Do YYYY, h:mm:ss a'),
          "View_Count" : "0"
        }
      };
      var sub_name_split = $scope.subject_name.split(" ");
      var sub_name = '';
      for (var i =0 ; i< sub_name_split.length ; i++){sub_name = sub_name + sub_name_split[i] + "_"}
      var data2 = {
        Subject_Name : sub_name,
        Subject_Term : $scope.term_Select,
        Subject_Year : $scope.year_Select
      };
      $http.post('/insert_data_to_db_teacher' , data)
      .success(function(data){
        $http.post('/insert_type_for_log_follow' , data2).success(function(){
          location.reload();
        });
      });


    };

  }]);
