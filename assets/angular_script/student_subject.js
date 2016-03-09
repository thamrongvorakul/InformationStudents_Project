var app = angular.module('student_subject', ['ngFileUpload' , 'angularFileUpload' ,'ngSanitize','LocalStorageModule' ]);

app.controller('student_subjectController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce' , 'Upload' , 'FileUploader',
  function ( $scope, $rootScope, $http   ,localStorageService , $sce , Upload ,FileUploader)
  {

    $scope.select_sub_name = localStorageService.get('select_sub_name');
    $scope.select_term = localStorageService.get('select_term');
    $scope.select_year = localStorageService.get('select_year');
    $scope.lec_name_upload = localStorageService.get('select_lecturer_name');
    var count_followers;
    $scope.id = '';
    var subject_split = localStorageService.get('select_sub_name').split(" ");
    var subject = '' ;
    for (var i=0 ;i<subject_split.length ; i++){subject = subject + subject_split[i]}
    var Lec_Name_default = localStorageService.get('select_lecturer_name');
    var Lec_Name_split = Lec_Name_default.split(" ");
    var Lec_Name = '';

    for (var i=0 ;i<Lec_Name_split.length ; i++){Lec_Name = Lec_Name + Lec_Name_split[i]}
    var data_send1 = {subject :  subject,subject_default : localStorageService.get('select_sub_name'),term : localStorageService.get('select_term'),
    year : localStorageService.get('select_year'),Lec_Name : Lec_Name ,path : 'documents'};

    $http.post('/get_files_documents' ,data_send1)
    .success (function (data){
      $scope.files_count_documents = data.length;
      $scope.files_documents = [];
      for (var i=0 ; i<data.length ; i++)
      {
          $scope.files_documents.push({data : data[i]});
      }

    });
    $http.get('/getdata_homework_times').success(function(data){
      $scope.times_homework_arr = [];
      for (var i=0 ; i< data.length ; i++){$scope.times_homework_arr.push({time: data[i]['Times']})};
    });
    var data_send2 = {subject :  subject,subject_default : localStorageService.get('select_sub_name'),term : localStorageService.get('select_term'),
      year : localStorageService.get('select_year'),Lec_Name : Lec_Name ,path : 'homework'
    };
    $http.post('/get_files_homework' ,data_send2)
    .success (function (data){
      $scope.files_count_homework = data.length;
      $scope.files_homework = [];
      for (var i=0 ; i<data.length ; i++)
      {
          $scope.files_homework.push({data : data[i]});
      }
    });

    var data_send3 = {subject :  subject,subject_default : localStorageService.get('select_sub_name'),term : localStorageService.get('select_term'),
      year : localStorageService.get('select_year'),Lec_Name : Lec_Name ,path : 'score'
    };
    $http.post('/get_files_score' ,data_send3)
    .success (function (data){
      $scope.files_count_score = data.length;
      $scope.files_score = [];
      for (var i=0 ; i<data.length ; i++)
      {
          $scope.files_score.push({data : data[i]});
      }
    });
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    $scope.type_split_arr = localStorageService.get('select_sub_name').split(" ");
    $scope.type = '';
    for (var i =0 ; i< $scope.type_split_arr.length ; i++){$scope.type =  $scope.type + $scope.type_split_arr[i]+ '_' ;}
    var data_for_search = {
      "header" : {"index" : "upload_log" , "path" : 'news' },
      "data" : {Subject_Term : $scope.select_term + '/' + $scope.select_year , Subject_Name : localStorageService.get('select_sub_name') , Lec_Name_Upload : localStorageService.get('select_lecturer_name') }
    };
    $http.post('/get_files_news' ,data_for_search)
    .success (function (data){
      $scope.files_count_news = data.length;
      $scope.files_news = [];
      for (var i=0 ; i<data.length ; i++)
      {
          $scope.files_news.push({name : data[i]});
      }
    });

    var sub_name_split = localStorageService.get('select_sub_name').split(" ");
    var sub_name = '';
    for (var i=0 ; i<sub_name_split.length ; i++){sub_name = sub_name + sub_name_split[i] + "_"}

    var data = {
      std_FName : 'Wichittra',
      std_LName : 'Iam-itsara',
      std_email : localStorageService.get('email_student'),
      subject_name : sub_name,
      subject_name_default : localStorageService.get('select_sub_name'),
      subject_term : localStorageService.get('select_term'),
      subject_year : localStorageService.get('select_year')

    };
    $http.post('/search_data_for_the_followers' , data).success(function(data){
      var count_followers = 0;
      for (var i =0 ; i<data.length ; i++){
        if (data[i]["_source"]["Status_Follow"] === 1){
          count_followers = count_followers + 1;

        }
        $scope.followers_count_all = count_followers;
      }

    });
    $http.post('/search_data_for_the_views' , data).success(function(data){
      $scope.views_count_all = data[0]["_source"]["View_Count"];
    });
    $http.post('/search_indi_data_in_student_subject' ,data).success(function(data_res){

      $scope.status_like_unlike = "FOLLOW";
      $scope.text_show = 'กดเพื่อรับข้อมูลอัพเดท';
      if (data_res !== 'User never use this function'){
        $scope.status_follow = data_res[0]["_source"]["Status_Follow"];
        $scope.id = data_res[0]["_id"];
        $scope.event_click = data_res[0]["_source"]["Event_Click"];
        if ($scope.status_follow === 1){
          $scope.status_like_unlike = 'UNFOLLOW';
          $scope.text_show = 'ยกเลิกการรับข้อมูล'
        }
        else {
          $scope.status_like_unlike = "FOLLOW";
          $scope.text_show = 'กดเพื่อรับข้อมูลอัพเดท'
        }
      }
    });

    $scope.like_click = function (){
      if ($scope.status_like_unlike === 'FOLLOW'){
        if ($scope.event_click !== 'click'){
          var data_follow1 = {
            std_FName : 'Wichittra',
            std_LName : 'Iam-itsara',
            std_email : localStorageService.get('email_student'),
            subject_name : sub_name,
            subject_name_default : localStorageService.get('select_sub_name'),
            subject_term : localStorageService.get('select_term'),
            subject_year : localStorageService.get('select_year'),
            status_follow : 1,
            event_click : 'click'
          };
          $http.post('/insert_data_follower' , data_follow1).success(function(data){
            $scope.status_like_unlike = 'UNFOLLOW';
            $scope.text_show = 'ยกเลิกการรับข้อมูล'
          })
        }
        else if ($scope.event_click === 'click'){
          var data_follow2 = {
            std_FName : localStorageService.get('FName_User'),
            std_LName : localStorageService.get('LName_User'),
            std_email : localStorageService.get('email_student'),
            subject_name : sub_name,
            subject_name_default : localStorageService.get('select_sub_name'),
            subject_term : localStorageService.get('select_term'),
            subject_year : localStorageService.get('select_year'),
            status_follow : 1,
            id : $scope.id,
            event_click : 'click'
          };
            $http.post('/update_data_follower' , data_follow2).success(function(data){
              $scope.status_like_unlike = 'UNFOLLOW';
              $scope.text_show = 'ยกเลิกการรับข้อมูล'
            })
        }
      }
      else if ($scope.status_like_unlike === 'UNFOLLOW'){
        var data_follow2 = {
          std_FName : localStorageService.get('FName_User'),
          std_LName : localStorageService.get('LName_User'),
          std_email : localStorageService.get('email_student'),
          subject_name : sub_name,
          subject_name_default : localStorageService.get('select_sub_name'),
          subject_term : localStorageService.get('select_term'),
          subject_year : localStorageService.get('select_year'),
          status_follow : 0,
          id : $scope.id,
          event_click : 'click'
        };
          $http.post('/update_data_follower' , data_follow2).success(function(data){
            $scope.status_like_unlike = "FOLLOW";
            $scope.text_show = 'กดเพื่อรับข้อมูลอัพเดท'
          })
      }
    };

  // อัพโหลดไฟล์ส่งการบ้านให้อาจารย์

    $scope.name_file_upload = 'No File Chosen';
    $scope.subject_for_send_homework = '';
    $scope.description_homework = '';
    $scope.times_homework_select = '';
        $scope.lec_name_upload = localStorageService.get('select_lecturer_name');
        var lec_name_cut_split = $scope.lec_name_upload.split(" ");
        var lec_name_cut = '';
        for (var i=0;i<lec_name_cut_split.length ; i++){lec_name_cut = lec_name_cut + lec_name_cut_split[i]}
        var sub_name_split = $scope.select_sub_name.split(" ");
        var sub_name_cut = '';
        for (var i=0 ; i<sub_name_split.length ; i++){sub_name_cut = sub_name_cut + sub_name_split[i]}



      var uploader = $scope.uploader = new FileUploader({
          url: '/postsendhomework'

      });
        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {

          //  console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
          //  console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            //console.log(addedFileItems.length);
          //  console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {

          if ($scope.description_homework === ''){
            $scope.description_homework = 'ไม่มีคำอธิบายเพิ่มเติม';
          }

          var data = {
            path : 'send_homework',
            subject :  sub_name_cut,
            subject_default : localStorageService.get('select_sub_name'),
            Std_Name : localStorageService.get('Fullname_User'),
            ID_NO : localStorageService.get("ID_NO_Std"),
            term : localStorageService.get('select_term'),
            year : localStorageService.get('select_year'),
            Lec_Name_Default :localStorageService.get('select_lecturer_name'),
            Lec_Name : lec_name_cut,
            Description_Homework_Send : $scope.description_homework,
            Subject_Send_Homework :  $scope.subject_for_send_homework,
            Times_Homework_Select : $scope.times_homework_select,
            Date_Upload : moment().format('MMMM Do YYYY, h:mm:ss a')
          }
          item.formData.push(data);
        };
        uploader.onProgressItem = function(fileItem, progress) {

        };
        uploader.onProgressAll = function(progress) {
          //  console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          //  console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
          ///  console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
          //  console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          //  console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
          //  console.info('onCompleteAll');
        };

  }]);
