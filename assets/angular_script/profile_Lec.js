
angular.module('profileLec', ['ngFileUpload' , 'angularFileUpload' ,'ngCookies','LocalStorageModule'])
.controller('profilelecController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$cookies','localStorageService' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader  , $cookies , localStorageService)
  {

    $scope.education = [];
    $scope.research = [];
    $scope.subject_hold = [];
    $scope.name_lec = '';
    $scope.path_file_pic_main = '';
    $scope.path_file_pic_icon = '';
    $scope.room_lec = '';
    $scope.email = '';
    $scope.homepage = '';
    $scope.tel_no = '';


    var data2 ;
     $http.post('/test_login2')
     .success(function(data, status, headers, config)
     {
         console.log(data);
         if (data !== '')
         {

           $cookies.name_send = data;

         }
         else if ( data === '')
         {
           console.log('KAK');

         }
         //console.log(data);
           data2 = {
           'Name' : localStorageService.get('name_lec')
           };



       $http.post('/search_data_teacher' , data2)
       .success(function(data ,status, headers, config)
       {

           $scope.name_lec = data[0]['_source']['Name'];
           $scope.path_file_pic_main = data[0]['_source']['path_file_pic_main'];
           $scope.path_file_pic_icon = data[0]['_source']['path_file_pic_icon']
           $scope.room_lec = data[0]['_source']['aboutme']['ห้องพัก'];
           $scope.email = data[0]['_source']['aboutme']['E-mail'];
           $scope.homepage = data[0]['_source']['aboutme']['โฮมเพจ'];
           $scope.tel_no = data[0]['_source']['aboutme']['เบอร์โทร'];

           for (var i = 0 ; i< data[0]['_source']['การศึกษา'].length ; i++)
           {

             $scope.education.push({education : data[0]['_source']['การศึกษา'][i]});
           }
           for (var i = 0 ; i< data[0]['_source']['งานวิจัยและสิ่งตีพิมพ์'].length ; i++)
           {

             $scope.research.push({research : data[0]['_source']['งานวิจัยและสิ่งตีพิมพ์'][i]});
           }
           for (var i = 0 ; i< data[0]['_source']['รายวิชาที่รับผิดชอบ'].length ; i++)
           {

             $scope.subject_hold.push({subject_hold : data[0]['_source']['รายวิชาที่รับผิดชอบ'][i]});

           }


     })
     .error(function(data, status, headers, config)
     {
       console.log('Error' + data);
     });

   });


  }]);
