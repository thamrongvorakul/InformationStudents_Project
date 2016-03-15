
var app = angular.module('changepassword', ['oitozero.ngSweetAlert' , 'angular-momentjs','LocalStorageModule' ]);
app.controller('changepasswordController', ['$scope', '$http' , '$moment','localStorageService' ,'$timeout', 'SweetAlert' ,
  function ( $scope, $http  , $moment ,  localStorageService ,  $timeout , SweetAlert)
  {

      $scope.old_password = '';
      $scope.new_password = '';
      $scope.new_password2 = '';
      $scope.Fullname_User = localStorageService.get('Fullname_User');
      $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
        $scope.change_password_click = function (){
          $scope.message = '';
          $scope.wrong_password = '';
          if ( $scope.new_password === $scope.new_password2){
            var jsonData = {
              "header" : {"index" : "students"},
              "data" : {
                "email_id" : localStorageService.get('Email_User'),
                "old_password" : $scope.old_password,
                "new_password" : $scope.new_password,
                "FName" : localStorageService.get('FName_User'),
                "LName" : localStorageService.get("LName_User")
              }
            };

            $http.post('/change_password', jsonData)
            .success(function(data, status, headers, config)
            {
              SweetAlert.swal({
                  title: "เปลี่ยนรหัสผ่านเรียบร้อย!",
                  text: "กรุณาใช้รหัสใหม่เมื่อทำการเข้าระบบครั้งถัดไป",
                  type: "success"
              });
              $scope.old_password = '';
              $scope.new_password = '';
              $scope.new_password2 = '';
            })
            .catch(function onError(sailsResponse) {

            // Handle known error type(s).
            // Invalid username / password combination.
            if (sailsResponse.status === 400 || 404) {
                $scope.wrong_password = "รหัสเก่าของคุณผิดพลาด";
            }
            })
          }
          else {
            $scope.message = 'รหัสใหม่ที่กรอกไม่ตรงกัน';
          }

        }



  }]);
