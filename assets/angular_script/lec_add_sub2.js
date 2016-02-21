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


    $scope.remove_click = function (id,type){
      console.log(id + "  " + type);
      var data = {
          "header" : {"type":type , "id" : id}
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
          "Created_By" : "Archarn.Anek Thamrongvorakul"
        }
      };

      $http.post('/insert_data_to_db_teacher' , data)
      .success(function(data){
        console.log('put data to elasticsearch complete');
        location.reload();
      })


    };

  }]);
