angular.module('create_profile_lecturer', ['ngFileUpload' ,'angularFileUpload','LocalStorageModule' , 'ngSanitize' ])
.controller('create_profile_lecturerController', ['$scope','Upload', '$http', 'FileUploader' , 'localStorageService' , '$sce' ,
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

    $http.get('/get_data_title_name').success(function(data){
      $scope.title_arr = [];
      for (var i =0 ; i<data.length ; i++){
        $scope.title_arr.push({data : data[i]["value"]})
      }
    })
    $http.post('/search_data_for_create_lecturer').
    success(function(data){
      $scope.teacher_arr = [];
      for (var i=0 ; i<data.length ; i++)
      { 
        $scope.teacher_arr.push({data : data[i]});
      }
      $scope.count_no_read = data.length;
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
      console.log(JSON.stringify($scope.education_arr));
    }


    var uploader = $scope.uploader = new FileUploader({
        url: '/lecturer_profile_upload'

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
          Name : $scope.Title + $scope.FName + " " + $scope.LName ,
          Name_Path_Upload : $scope.Title + $scope.FName + $scope.LName ,
          id : $scope.Title + $scope.FName + "_"+$scope.LName ,
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
          Status_Room  : '0'
        };
        item.formData.push(data);
      };
      uploader.onProgressItem = function(fileItem, progress) {

      };
      uploader.onProgressAll = function(progress) {
        //  console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
        if (count === 2){
          location.reload();
        }
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
