angular.module('contactsLec', ['ngFileUpload' , 'angularFileUpload','LocalStorageModule' ,'ngCookies' , 'summernote' , 'ngSanitize' ])
.controller('contactslecController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , 'localStorageService' , '$cookies', '$sce' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader ,  localStorageService , $cookies , $sce )
  {



      $scope.data_teacher_show_contacts = [];
      $scope.message_for_mail = '';
      $scope.subject_for_mail = '';
      $scope.lecname_for_mail = '';



      $http.post('/search_mailbox_subject' , {
        "header" : {
          "index" : "mailbox",
          "type" : "send"
        },
        "data" : {
          "Lec_Name" : "Archarn.Anek Thamrongvorakul",
          "Std_Name" : "Wichittra Iam-Itsara",
          "Subject" : 'ทดสอบส่งข้อความ',
          "Message" : $scope.message_for_mail,
          "Date" : moment().format('MMMM Do YYYY, h:mm:ss a'),
          "Status" : "0"
        }
      })
      .success(function(data){
        $scope.subject = data[0]["_source"]["Subject"];
        $scope.message = $sce.trustAsHtml(data[0]["_source"]["Message"]);
        $scope.date = data[0]["_source"]["Date"];
        $scope.Std_Name = data[0]["_source"]["Std_Name"];
        $scope.Lec_Name = data[0]["_source"]["Lec_Name"];

      });


      $scope.send_mail_click = function (){
        var data = {
          "header" : {
            "index" : "mailbox",
            "type" : "send"
          },
          "data" : {
            "Lec_Name" : "Archarn.Anek Thamrongvorakul",
            "Std_Name" : "Wichittra Iam-Itsara",
            "Subject" : $scope.subject_for_mail,
            "Message" : $scope.message_for_mail,
            "Date" : moment().format('MMMM Do YYYY, h:mm:ss a'),
            "Status" : "0"
          }
        };

        $http.post('/put_mailbox_to_elasticsearch' , data)
        .success(function(data){
          alert('Send Mail Success !!');
        });

      };
      $scope.init_lecname = function (lecname){
        $scope.lecname_for_mail = lecname;
      };


      $http.post('/search_data_teacher_to_show_contacts')
      .success(function(data){
        for ( var i = 0 ; i< data.length ; i++){
          $scope.data_teacher_show_contacts.push({data : data[i]});
        }
      });





      $scope.test_click = function (){
        console.log($scope.lecname_for_mail);
        console.log($scope.message_for_mail );
      };

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
