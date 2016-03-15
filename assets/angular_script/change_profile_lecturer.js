angular.module('changeprofile', ['ngFileUpload' ,'angularFileUpload','LocalStorageModule' , 'ngSanitize' ])
.controller('changeprofileController', ['$scope','Upload', '$http', 'FileUploader' , 'localStorageService' , '$sce' ,
  function ( $scope, Upload, $http , FileUploader ,  localStorageService  , $sce   )
  {

        $scope.education_arr = [];
        $scope.research_arr = [];
        $scope.subject_arr = [];
        $scope.Title = '';
        $scope.FName = '';
        $scope.LName = '';
        $scope.position = '';
        $scope.room = '';
        $scope.homepage = '';
        $scope.email = '';
        $scope.tel = '';
        $scope.Fullname_User = localStorageService.get('Fullname_User');
        $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');

    $http.post('/search_data_lecturer_for_dashboard' ,
      {Lec_Name_id :localStorageService.get('title_user') + localStorageService.get('FName_User')+ ' ' + localStorageService.get('LName_User')}
    ).success(function(data){
      $scope.Title = localStorageService.get('title_user');
      $scope.FName = localStorageService.get('FName_User');
      $scope.LName = localStorageService.get('LName_User');
      $scope.position = data[0]["_source"]["position"];
      for (var i= 0 ; i <data[0]["_source"]["education"].length ; i++){
        $scope.education_arr.push({data : data[0]["_source"]["education"][i]});
      }
      for (var i= 0 ; i <data[0]["_source"]["research"].length ; i++){
        $scope.research_arr.push({data : data[0]["_source"]["research"][i]});
      }
      for (var i= 0 ; i <data[0]["_source"]["subject_holding"].length ; i++){
        $scope.subject_arr.push({data : data[0]["_source"]["subject_holding"][i]});
      }
      $scope.room = data[0]["_source"]["aboutme"]["room"];
      $scope.homepage = data[0]["_source"]["aboutme"]["homepage"];
      $scope.email = data[0]["_source"]["aboutme"]["email"];
      $scope.tel = data[0]["_source"]["aboutme"]["tel_no"];
      $scope.name_image_icon = data[0]["_source"]["path_file_pic_icon"];
      $scope.name_image_main = data[0]["_source"]["path_file_pic_main"];
    });
    $http.get('/get_data_title_name').success(function(data){
      $scope.title_arr = [];
      for (var i =0 ; i<data.length ; i++){
        $scope.title_arr.push({data : data[i]["value"]})
      }
    })
    $scope.education_arr_push=function(){
      $scope.education_arr.push({})
    };
    $scope.education_arr_remove = function(index){
      $scope.education_arr.splice(index , 1)
    };

    $scope.research_arr_push = function(){
      $scope.research_arr.push({})
    }
    $scope.reasearch_arr_remove = function (index){
      $scope.research_arr.splice(index , 1);
    }

    $scope.subject_arr_push = function (){
        $scope.subject_arr.push({});
    }
    $scope.subject_arr_remove = function (index){
        $scope.subject_arr.splice(index , 1)
    };
    $scope.test_click = function (){
      console.log($scope.Title);
      console.log($scope.FName);
      console.log($scope.LName);
    }


    var uploader = $scope.uploader = new FileUploader({
        url: '/lecturer_profile_update'

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
      var count = 0;
      uploader.onBeforeUploadItem = function(item) {
        count = count + 1;
        if (count === 1){
          $scope.name_image_icon = item.file.name;
        }
        else if (count === 2){
          $scope.name_image_main = item.file.name;
        }
        var data = {
          Title : $scope.Title,
          FName : $scope.FName,
          LName : $scope.LName,
          Name : $scope.Title + $scope.FName + " " + $scope.LName ,
          Name_Path_Upload : $scope.Title + $scope.FName + $scope.LName ,
          id : $scope.Title + $scope.FName + "_"+$scope.LName ,
          id_for_delete : localStorageService.get('title_user') + localStorageService.get('FName_User') + '_' + localStorageService.get('LName_User'),
          id_for_delete_user : localStorageService.get('FName_User') + "::" + localStorageService.get('LName_User'),
          FName_Default : localStorageService.get('FName_User'),
          LName_Default : localStorageService.get('LName_User'),
          Title_Default : localStorageService.get('title_user'),
          position : $scope.position ,
          education : JSON.stringify($scope.education_arr),
          research : JSON.stringify($scope.research_arr) ,
          subject_holding : JSON.stringify($scope.subject_arr) ,
          room : $scope.room ,
          homepage : $scope.homepage ,
          email : $scope.email ,
          tel_no : $scope.tel ,
          name_image_icon : $scope.name_image_icon ,
          name_image_main : $scope.name_image_main,
          len_edu : $scope.education_arr.length,
          len_res : $scope.research_arr.length ,
          len_sub : $scope.subject_arr.length ,
          Status_Room  : '0',
          email_user : localStorageService.get('Email_User')
        };
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
        localStorageService.set('title_user' , $scope.Title);
        localStorageService.set('FName_User' , $scope.FName);
        localStorageService.set('LName_User' , $scope.LName);
        location.reload();
        //  console.info('onCompleteAll');
      };

  }]);
