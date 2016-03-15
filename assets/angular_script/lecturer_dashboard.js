
var app = angular.module('lecturerdashboard', [ 'angular-momentjs','LocalStorageModule' ,'slick']);
app.controller('lecturerdashboardController', ['$scope', '$http' , '$moment','localStorageService' ,'$timeout',
  function ( $scope, $http  , $moment ,  localStorageService ,  $timeout)
  {

      $scope.Title_User = localStorageService.get('title_user');
      $scope.FName_User = localStorageService.get('FName_User');
      $scope.LName_User = localStorageService.get('LName_User');
      $scope.Lec_id_from_search = '';
      $scope.status_room_active = 'ไม่อยู่';
      $scope.class_status = 'danger';
      $scope.Fullname_User = localStorageService.get('Fullname_User');
      $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
      $scope.search = '';
      $timeout(function(){
        $scope.dataLoaded = true;
      }, 2000);

      $scope.remove_mail_click = function(id ){
        var data = {
          header : {
            id : id
          }
        };
        $http.post('/remove_mailbox_from_lecturer_dashboard' , data).success(function(data){
          localtion.reload();
        })
      }
      $scope.status_room_click_active = function (){
          $http.post('/update_status_room_lecturer' , {Lec_Id : $scope.Lec_id_from_search , Status_Room : '1'})
          .success(function(data){
            $scope.status_room_active = 'อยู่';
            $scope.class_status = 'navy';
            $scope.class_status_2 = 'primary';

          });
      };
      $scope.status_room_click_not_active = function (){
          $http.post('/update_status_room_lecturer' , {Lec_Id : $scope.Lec_id_from_search , Status_Room : '0'})
          .success(function(data){
            $scope.status_room_active = 'ไม่อยู่';
            $scope.class_status = 'danger';
            $scope.class_status_2 = 'danger';
          });
      };
      $scope.show_mailbox_click = function(id){
        var data = {
          mailbox_id : id ,
          Status : '1'
        };
        console.log(data.mailbox_id);
        $http.post('/update_status_read_mailbox' , data)
        .success(function(data){
          localStorageService.set('mailbox_id' , id);
          location.href = 'mailbox_view';
        });
      };
      $scope.go_to_show_mailbox_view = function ( subject , id){
        localStorageService.set('mailbox_id' , id);
        localStorageService.set('mailbox_subject' , subject);
        location.href = "mailbox_view";
      };
      $http.post('/search_data_lecturer_for_dashboard' , {Lec_Name_id : $scope.Title_User  +$scope.FName_User + " " +$scope.LName_User})
      .success(function(data){
          $scope.path_file_pic_icon = data[0]["_source"]["path_file_pic_icon"];
          $scope.Lec_id_from_search = data[0]["_id"];
          $scope.Lec_Name_from_search = data[0]["_source"]["Name"];
          $scope.Lec_position_from_search = data[0]["_source"]["position"];
          $scope.Lec_room_from_search = data[0]["_source"]["aboutme"]["room"];
          $scope.Lec_email_contact_from_search = data[0]["_source"]["aboutme"]["email"];
          $scope.Lec_tel_no_contact_from_search = data[0]["_source"]["aboutme"]["tel_no"];
          localStorageService.set('path_file_pic_icon' , data[0]["_source"]["path_file_pic_icon"]);
          if (data[0]["_source"]["Status_Room"] === '1'){
            $scope.status_room_active = 'อยู่';
            $scope.class_status = 'navy';
          }
          else if (data[0]["_source"]["Status_Room"] === '0'){
            $scope.status_room_active = 'ไม่อยู่';
            $scope.class_status = 'danger';
          }
      });

      $http.post('/get_data_on_elasticsearch' , {Lec_Name : localStorageService.get('Fullname_User')})
      .success (function (data){
          $scope.subject_arr = [];
          $scope.Lec_subject_holding =0;
          var count = 0;
          for (var i=0 ; i<data.length ; i++){
            $scope.subject_arr.push({data : data[i]})
             count = count + 1;
          }

          $scope.Lec_subject_holding = count;

      });

      $http.post('/search_all_mailbox_subject' , {
        "header" : {
          "index" : "mailbox",
          "type" : "send"
        },
        "data" : {
          "Lec_Name" : localStorageService.get('Fullname_User'),
          "Std_Name" : "Wichittra Iam-Itsara",
          "Subject" : 'ทดสอบส่งข้อความ',
          "Message" : $scope.message_for_mail,
          "Date" : moment().format('MMMM Do YYYY, h:mm:ss a'),
          "Status" : "0"
        }
      })
      .success(function(data){
        $scope.mailbox_arr_no_read = [];
        $scope.mailbox_arr_read = [];
        var count_no_read = 0 ;
        var count_read = 0;
        for (var i =0 ;i< data.length ; i++)
        {
          if (data[i]["_source"]["Status"] === '0'){
            $scope.mailbox_arr_no_read.push({data : data[i]});
            count_no_read = count_no_read+1;
          }
          else if (data[i]["_source"]["Status"] === '1'){
            $scope.mailbox_arr_read.push({data : data[i]});
            count_read = count_read + 1;

          }
        }
        $scope.count_no_read = count_no_read;
        $scope.count_read = count_read;
      });








  }]);
