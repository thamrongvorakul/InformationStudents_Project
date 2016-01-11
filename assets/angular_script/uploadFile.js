
angular.module('uploadFile', ['ngFileUpload' , 'angularFileUpload' ,  'angular-momentjs'])
.controller('uploadfileController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$moment',
  function ( $scope, $rootScope,Upload, $http , FileUploader , $moment )
  {
      var todoList = this;
      todoList.todos = [];
      todoList.feedname = [];
      todoList.fname = [];
      $scope.files_name = [];
      var radiovalue = '';
      todoList.nameupload = 'No File Chosen.';
      $scope.name_of_file = '';

      $scope.detail = '5555';
      $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
      $scope.date_hw = "11-11-1111";



      $http.post('/get_files')
      .success(function(data ,status,headers,config)
      {

          for (var i=0 ; i<data.length ; i++)
          {
            console.log(data[i]);
            $scope.files_name.push({name : data[i]});

          }
      })
      .error(function(data,status,headers,config){

      });



      $http.get('/getdata_on_combobox')
      .success(function(data, status, headers, config)
      {
        for(var i=0;i<data.length;i++)
        {
             todoList.feedname.push({name : data[i]['Feed_Name']});
        }
      }).error(function(data, status, headers, config)
      {
      });


      var uploader = $scope.uploader = new FileUploader({
          url: '/postupload'

      });
        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log(this.queue.length);
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

          var dataJson = {
            "header" : { "index" : "upload_log" , "type" : "2555"

            },
            "data" : {
              "detail" : $scope.detail,
              "date_log" : $scope.date_log,
              "homework_date" : $scope.date_hw
            }
          }
          $http.post('/bulkinsert_upload',dataJson).success(function(data ,status,headers,config)
          {
              console.log('Put data to elasticsearch success');
          }).error(function(data,status,headers,config){

          });

            $scope.name_of_file = item.file.name;
          //  console.log (item.file.name);
          //  console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
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

      //  console.info('uploader', uploader);




      $scope.changepath_on_combobox = function (){
        if (todoList.fname === "เอกสารประกอบการเรียน"){
          location.href = 'subject_doc_dload2'
        }
        else if (todoList.fname === "การบ้าน"){

          location.href = 'subject_hw_dload2'
        }
        else if (todoList.fname === "อัพเดทข่าวสาร"){
          location.href = 'subject_news_dload2'
        }
        else if (todoList.fname === "คะแนนสอบ"){
          location.href = 'subject_score_dload2'
        }
      };

      $scope.downloadFile = function (){
        $http.post('/download').success(function(data, status, headers, config)
                 {



                 }).error(function(data, status, headers, config)
                 {
                 });
      }
  }]);

/*angular.module('uploadFile',['ngFileUpload'])
  .controller('uploadfileController', ['$scope','$window', '$http', 'Upload', function($scope, $window, $http, Upload)
  {

    var todoList = this;
          todoList.todos = [];
          todoList.feedname = [];
          todoList.fname = [];
          var radiovalue = '';
          todoList.nameupload = 'No File Chosen.';
          $scope.$watch('files', function ()
          {
            $scope.upload($scope.files);
          });
          $scope.upload = function (files)
          {
          if (files && files.length)
            {
                  for (var i = 0; i < files.length; i++)
                  {
                      var file = files[i];
                      Upload.upload(
                        {
                            url: '/postupload',
                            file: file
                        }).progress(function (evt)
                        {
                            console.log('555');
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            todoList.progress = progressPercentage+'%';
                            $scope.dynamic = progressPercentage;
                            todoList.nameupload = evt.config.file.name;
                            console.log('progress: ' + progressPercentage + '% '+ $scope.dynamic + evt.config.file.name);
                        }).success(function (data, status, headers, config)
                        {
                        });
                  }
          }
        };


  /*  $scope.nameupload = 'No File Chosen';

    $scope.$watch('files', function ()
      {
        $scope.uploadFile($scope.files);
      });

    $scope.uploadFile = function (files)    $http.get('/api/json/Feeds_GetFeeds').success(function(data, status, headers, config)
      {
        for(var i=0;i<data.length;i++)
        {
            todoList.feedname.push({name : data[i]['Feed_Name']});
        }
      }).error(function(data, status, headers, config)
      {
      });
    {
      console.log('555');
      if (files && files.length)
      {
            console.log('555111');
            for (var i = 0; i < files.length; i++)
            {
                      var file = files[i];
                      Upload.upload(
                        {
                            url: '/postupload',
                            file: file
                        }).progress(function (evt)
                        {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.progress = progressPercentage+'%';
                            $scope.dynamic = progressPercentage;
                            $scope.nameupload = evt.config.file.name;
                            console.log('progress: ' + progressPercentage + '% '+ $scope.dynamic + evt.config.file.name);
                        }).success(function (data, status, headers, config)
                        {
                        });
              }
          }
            else { console.log('sss')
          }
    };

  }]);*/
