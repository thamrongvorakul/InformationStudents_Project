angular.module('contactsLec', ['ngFileUpload' , 'angularFileUpload','LocalStorageModule' ,'ngCookies'])
.controller('contactslecController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , 'localStorageService' , '$cookies',
  function ( $scope, $rootScope,Upload, $http , FileUploader ,  localStorageService , $cookies)
  {


      $scope.data_teacher_show_contacts = [];

      $http.post('/search_data_teacher_to_show_contacts')
      .success(function(data){
        console.log('5555');
        for ( var i = 0 ; i< data.length ; i++){
          $scope.data_teacher_show_contacts.push({data : data[i]});
          console.log(data[i]);
        }
      });


      $scope.wisan_click = function (name_lec){
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


        console.log(name_lec);
                  data2 = {
                  'Name' : name_lec
                  };




                              $http.post('/search_data_teacher' , data2)
                              .success(function(data ,status, headers, config)
                              {

                                  $scope.name_lec = data[0]['_source']['Name'];
                                  $scope.path_file_pic_main = data[0]['_source']['path_file_pic_main'];
                                  $scope.path_file_pic_icon = data[0]['_source']['path_file_pic_icon']
                                  $scope.room_lec = data[0]['_source']['aboutme']['room'];
                                  $scope.email = data[0]['_source']['aboutme']['E-mail'];
                                  $scope.homepage = data[0]['_source']['aboutme']['honepage'];
                                  $scope.tel_no = data[0]['_source']['aboutme']['tel_no'];

                                  for (var i = 0 ; i< data[0]['_source']['education'].length ; i++)
                                  {

                                    $scope.education.push({education : data[0]['_source']['education'][i]});
                                  }
                                  for (var i = 0 ; i< data[0]['_source']['research'].length ; i++)
                                  {

                                    $scope.research.push({research : data[0]['_source']['research'][i]});
                                  }
                                  for (var i = 0 ; i< data[0]['_source']['subject_holding'].length ; i++)
                                  {

                                    $scope.subject_hold.push({subject_hold : data[0]['_source']['subject_holding'][i]});

                                  }


                            })
                            .error(function(data, status, headers, config)
                            {
                              console.log('Error' + data);
                            });




      }


  }]);
