var app = angular.module('homework_send', [ 'ngSanitize','LocalStorageModule' ]);

app.controller('homework_sendController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce' ,
  function ( $scope, $rootScope, $http   ,localStorageService , $sce  )
  {
    $scope.times_homework_select = '';
    $scope.Fullname_User = localStorageService.get('Fullname_User');
    $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
    $scope.times_homework_change = function (){
      console.log(  $scope.times_homework_select);
      $http.post('/search_data_homework_send' , {
        Lec_Name_Default : localStorageService.get('Fullname_User'),
        term : localStorageService.get('term'),
        year : localStorageService.get('year'),
        subject_name : localStorageService.get('subject_name'),
        Times_Homework_Select : $scope.times_homework_select
      }).success(function(data){
        $scope.homework_send_arr = [];
        $scope.times_all = [];
        $scope.status_attach_files = [];
        for (var i=0 ; i<data.length ; i++){
          $scope.homework_send_arr.push({data : data[i]});
        }
      })
    }

    $scope.init_homework_send_value = function (path_upload , description , ID_NO , std_name , subject ,date_upload,lec_name , file_name ){
      $scope.description = description;
      $scope.ID_NO = ID_NO;
      $scope.std_name = std_name ;
      $scope.subject = subject;
      $scope.lec_name = lec_name;
      $scope.date_upload = date_upload;
      var path_upload_cut = path_upload.split("/");
      var path_upload2 = '';
      for (var i =3 ; i < path_upload_cut.length ; i++){ path_upload2 = path_upload2 + path_upload_cut[i] + "/"}
      $scope.file_name = file_name;
      $scope.file_name_download = path_upload2 + file_name;
    };
    $http.get('/getdata_homework_times').success(function(data){
      $scope.times_homework_arr = [];
      for (var i=0 ; i< data.length ; i++){$scope.times_homework_arr.push({time: data[i]['Times']})};
    });


    $scope.score_arr = [];
    $scope.score_for_std = '';

    $scope.score_save_click = function(){
      $scope.homework_send_arr.push({score : $scope.score_for_std});
    }



    for (var i =0 ; i<$scope.score_arr.length ; i++){ $scope.score_arr[i]}
    $scope.send_score_click = function(){
      var Lec_Name_split = localStorageService.get('Fullname_User').split(" ");
      var Lec_Name = '';
      for (var i=0 ; i<Lec_Name_split.length ; i++){Lec_Name = Lec_Name + Lec_Name_split[i]}
      var subject_name_split = localStorageService.get('subject_name').split(" ");
      var subject_name = '';
      for (var i=0 ;i<subject_name_split.length ; i++){subject_name = subject_name + subject_name_split[i]}
      var data = {
        Lec_Name : Lec_Name,
        Subject_Name : subject_name,
        Term_Year :  localStorageService.get('term')+'.'+localStorageService.get('year'),
        Times : $scope.times_homework_select,
        ID_NO : $scope.ID_NO,
        std_name : $scope.std_name,
        score_for_std : $scope.score_for_std
      }
      $http.post('/put_data_score_to_excel' , data).success(function(data){

      })
    }
  }]);
