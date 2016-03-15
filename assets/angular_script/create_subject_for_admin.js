angular.module('create_subject_for_admin', ['ngFileUpload' ,'angularFileUpload','LocalStorageModule' , 'ngSanitize' ])
.controller('create_subject_for_adminController', ['$scope','Upload', '$http', 'FileUploader' , 'localStorageService' , '$sce' ,
  function ( $scope, Upload, $http , FileUploader ,  localStorageService  , $sce   )
  {

    $scope.Subject_Id = '';
    $scope.Subject_Name = '';
    $http.post('/search_data_subject_all').
    success(function(data){
        $scope.subject_arr = [];
        for (var i=0;i<data.length ; i++){
          $scope.subject_arr.push({data : data[i]});
        }
    });
    $scope.submit_click = function (){
      $http.post('/insert_subject_to_elasticsearch' , {Subject_Id : $scope.Subject_Id , Subject_Name : $scope.Subject_Name})
      .success(function(data){ location.reload(); $scope.Subject_Id =''; $scope.Subject_Name = ''; })
    }
    $scope.remove_subject_click = function (id){
      $http.post('/delete_data_in_subject_all' , {id: id}).success(function(data){window.alert('ลบวิชาที่เลือกเรียบร้อย กรุณา refresh เพื่ออัพเดทข้อมูล')})
    }
  }]);
