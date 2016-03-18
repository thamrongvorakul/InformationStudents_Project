var app = angular.module('lectureraddsub', [ 'oitozero.ngSweetAlert' ,'ngFileUpload' , 'angularFileUpload' ,'ngSanitize' ,'LocalStorageModule' ]);

app.controller('lectureraddsubController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'$window', 'localStorageService'  , 'SweetAlert' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader  ,$window , localStorageService ,SweetAlert)
  {
    $scope.term_arr = [];
    $scope.year_arr = [];
    $scope.term_Select = [];
    $scope.year_Select = [];
    $scope.subject_id = '';
    $scope.subject_name = '';
    $scope.Description = '';
    $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
    $scope.Fullname_User = localStorageService.get('Fullname_User');
    localStorageService.remove('times_homework_select');

      var lec_name = localStorageService.get('Fullname_User');
      var lec_name_split = lec_name.split(" ");
      var lec_name_after_split = '';
      for (var i=0 ; i< lec_name_split.length ; i++){lec_name_after_split = lec_name_after_split + lec_name_split[i]};

      $scope.demo4 = function (id,type,sub_name,term) {
          SweetAlert.swal({
                  title: "ยืนยันที่จะลบวิชา?",
                  text: sub_name,
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                  closeOnConfirm: false,
                  closeOnCancel: false },
              function (isConfirm) {
                  if (isConfirm) {
                      var data = {
                          "header" : {"type":type , "id" : id},
                          "data" : {
                            Subject_Name : sub_name,
                            Term : term,
                            Lec_Name : lec_name_after_split
                          }
                      };
                      $http.post('/delete_value_in_upload_log' , data).success(function(data){})
                      $http.post('/delete_subject_on_elasticsearch' , data )
                      .success(function(data){
                        SweetAlert.swal("ลบวิชาที่เลือกเรียบร้อย!", "วิชา" + sub_name + "ได้ทำการลบเรียบร้อยแล้ว", "success");
                        setTimeout(function(){
                            location.reload();
                        }, 2000);
                      });


                  } else {
                      SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
                  }

              });

      };


    $http.post('/search_data_subject_all').success(function(data){
      $scope.subject_all_arr = [];
      for (var i=0 ; i< data.length ; i++){
        $scope.subject_all_arr.push({data : data[i]})
      }
    })
    $scope.subject_change = function(){
      $http.post('/search_data_for_subject_id_select' , {Subject_Id : $scope.subject_id})
      .success(function(data){
        $scope.subject_name = data[0]["_source"]["Subject_Name"];
      })
    }
    $http.post('/get_data_on_elasticsearch' , {Lec_Name : localStorageService.get('Fullname_User')})
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
          "Lec_Name" : localStorageService.get('Fullname_User'),
          "Created_By" : localStorageService.get('Fullname_User'),
          "Date_Upload" : moment().format('MMMM Do YYYY, h:mm:ss a'),
          "View_Count" : "0",
          "Score_Count" : "0"
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
