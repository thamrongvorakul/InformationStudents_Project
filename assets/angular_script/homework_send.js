var app = angular.module('homework_send', [ 'oitozero.ngSweetAlert','ngSanitize','LocalStorageModule' ]);

app.controller('homework_sendController', ['$scope','$rootScope', '$http' ,'localStorageService' ,'$sce'  ,'SweetAlert' ,
  function ( $scope, $rootScope, $http   ,localStorageService , $sce  , SweetAlert)
  {

    $scope.times_homework_select = localStorageService.get('times_homework_select');
    $scope.Fullname_User = localStorageService.get('Fullname_User');
    $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
    $http.post('/search_data_homework_send' , {
      Lec_Name_Default : localStorageService.get('Fullname_User'),
      term : localStorageService.get('term'),
      year : localStorageService.get('year'),
      subject_name : localStorageService.get('subject_name'),
      Times_Homework_Select : localStorageService.get('times_homework_select')
    }).success(function(data){
      $scope.homework_send_arr = [];
      $scope.homework_send_arr2 = [];
      $scope.times_all = [];
      $scope.status_attach_files = [];
      for (var i=0 ; i<data.length ; i++){
        if (data[i]["_source"]["Status_Score_Add"] === 0){
          $scope.homework_send_arr.push({data : data[i]});
        }
        else if (data[i]["_source"]["Status_Score_Add"] === 1){
          $scope.homework_send_arr2.push({data : data[i]})
        }
      }

    })
    $scope.times_homework_change = function (){
      localStorageService.set('times_homework_select' , $scope.times_homework_select)
      $http.post('/search_data_homework_send' , {
        Lec_Name_Default : localStorageService.get('Fullname_User'),
        term : localStorageService.get('term'),
        year : localStorageService.get('year'),
        subject_name : localStorageService.get('subject_name'),
        Times_Homework_Select : localStorageService.get('times_homework_select')
      }).success(function(data){
        $scope.homework_send_arr = [];
        $scope.homework_send_arr2 = [];
        $scope.times_all = [];
        $scope.status_attach_files = [];
        for (var i=0 ; i<data.length ; i++){
          if (data[i]["_source"]["Status_Score_Add"] === 0){
            $scope.homework_send_arr.push({data : data[i]});
          }
          else if (data[i]["_source"]["Status_Score_Add"] === 1){
            $scope.homework_send_arr2.push({data : data[i]})
          }
        }

      })
    }
    $scope.clear_score_click = function(){
      SweetAlert.swal({
              title: "ยืนยันที่จะลบวิชา?",
              text: "ฟังก์ชันนี้ทำขึ้นมาเพื่อ ให้อาจารย์สามารถลบคะแนนออกจากฐานข้อมูลได้ เพื่อความปลอดภัยของข้อมูล (เนื่องจากผู้ใช้ทั่วๆไปสามารถเข้าถึงฐานข้อมูลได้)\n"+
              "ดังนั้น อาจารย์ควรจะทำการสร้างไฟล์ CSV สำรองไว้แล้ว เพราะจะไม่สามารถกลับมาแก้ไขข้อมูลคะแนนในหน้าเว็บไซต์ได้อีกครั้ง\n" +
              "โปรดตรวจสอบให้แน่ใจว่าได้ทำการสร้างไฟล์ CSV ไว้เรียบร้อยแล้ว",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "ตกลง",
              cancelButtonText: "ยกเลิก",
              closeOnConfirm: false,
              closeOnCancel: false },
          function (isConfirm) {
              if (isConfirm) {
                $scope.homework_send_id_arr = [];
                for (var i =0 ;i<$scope.homework_send_arr2.length ; i++){
                  var id = $scope.homework_send_arr2[i]["data"]["_id"];
                  var status_remove = $scope.homework_send_arr2[i]["data"]["_source"]["Status_Remove"]
                  $scope.homework_send_id_arr.push({id : id , status_remove : status_remove })
                }
                $http.post('/remove_field_score' , { id_arr : JSON.stringify($scope.homework_send_id_arr)})
                .success(function(data){
                  SweetAlert.swal("เคลียร์คะแนนออกจากฐานข้อมูลเรียบร้อยแล้ว!", "success", "success");
                  setTimeout(function(){
                      location.reload();
                  }, 1000);
                })
              } else {
                  SweetAlert.swal("Cancelled", "ยกเลิกการทำรายการเรียบร้อย", "error");
              }
          });

    };
    $scope.create_CSV_file = function (){
      $scope.homework_send_for_CSV = [];
      for (var i=0 ; i < $scope.homework_send_arr2.length ; i++){
        var ID_NUMBER = $scope.homework_send_arr2[i].data._source.ID_NO;
        var Student_Name = $scope.homework_send_arr2[i].data._source.Std_Name;
        var Score = $scope.homework_send_arr2[i].data._source.Score;
        var status_remove = $scope.homework_send_arr2[i].data._source.Status_Remove;
        if (status_remove === 'active'){
          $scope.homework_send_for_CSV.push({ ID_NUMBER,Student_Name,Score});
        }
      }
      var CSV_json = JSON.stringify($scope.homework_send_for_CSV);
      JSONToCSVConvertor(CSV_json , "ตารางแสดงคะแนน ของนักศึกษาแต่ละคน" , true);
    };

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
      for (var i=0 ; i< data.length ; i++){
          $scope.times_homework_arr.push({time: data[i]['Times']})
      };
    });


    $scope.score_arr = [];
    $scope.score_for_std = '';

    $scope.score_save_click = function(score,id){
        var data = {
          Score : score ,
          id : id,
          Status_Score_Add : 1
        }
        $http.post('/update_data_add_score_for_homework_send' , data).success(function(data){
          SweetAlert.swal("ให้คะแนนเรียบร้อย!", "success", "success");
          setTimeout(function(){
              location.reload();
          }, 1000);
        })
    }

    $scope.remove_click = function (id , ID_NO , files_name){

      SweetAlert.swal({
              title: "ยืนยันจะลบการบ้านที่นักศึกษาส่ง?",
              text: "ของ" + ID_NO  ,
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "ตกลง",
              cancelButtonText: "ยกเลิก",
              closeOnConfirm: false,
              closeOnCancel: false },
          function (isConfirm) {
              if (isConfirm) {
                var data2 = {
                  files_name : files_name,
                  subject_default : localStorageService.get('subject_name'),
                  subject :  localStorageService.get('subject_name'),
                  term : localStorageService.get('term'),
                  year : localStorageService.get('year'),
                  Lec_Name : localStorageService.get('Fullname_User'),
                  path : 'send_homework',
                  id : id,
                  times_homework_select : localStorageService.get('times_homework_select')
                }
                $http.post('/remove_file_homework_send' , data2)
                .success(function(data){
                  SweetAlert.swal("ลบไฟล์ที่เลือกเรียบร้อยแล้ว!", "success", "success");
                })

              } else {
                  SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
              }

          });

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

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {

            row += index + ',';
        }
        row = row.slice(0, -1);

        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    var fileName = "การบ้านครั้งที่" + $scope.times_homework_select + '_' + moment().format('LLL') ;
    fileName += ReportTitle.replace(/ /g,"_");
    var uri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(CSV) ;
    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  }]);
