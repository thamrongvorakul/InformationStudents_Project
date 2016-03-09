var app = angular.module('homework_send', [ 'ngSanitize','LocalStorageModule' ]);

app.controller('homework_sendController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce' ,
  function ( $scope, $rootScope, $http   ,localStorageService , $sce  )
  {
    $scope.times_homework_select = ''
    $scope.times_homework_change = function (){
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

  }]);
