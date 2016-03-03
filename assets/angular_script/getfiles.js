var app = angular.module('getfiles', ['ngFileUpload' , 'angularFileUpload' ,'ngSanitize','LocalStorageModule' ]);

app.controller('getfilesHomeworkController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'localStorageService' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader  ,localStorageService )
  {
    $scope.description = 'ไฟล์การบ้าน';
    $scope.date = '11-11-2559';

    var todoList = this;
    todoList.todos = [];
    todoList.feedname = [];
    todoList.fname = [];
    var radiovalue = '';
    todoList.nameupload = 'No File Chosen.';
    $scope.name_of_file = '';
    $scope.detail = '5555';
    $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.date_hw = "11-11-1111";
    $scope.button_file_name = '';

    var subject_split = localStorageService.get('subject_name').split(" ");
    var subject = '' ;
    for (var i=0 ;i<subject_split.length ; i++){subject = subject + subject_split[i]}
    var Lec_Name_default = 'Archarn.Anek Thamrongvorakul';
    var Lec_Name_split = Lec_Name_default.split(" ");
    var Lec_Name = '';
    for (var i=0 ;i<Lec_Name_split.length ; i++){Lec_Name = Lec_Name + Lec_Name_split[i]}

    var data_send = {
      path : 'homework',
      subject :  subject,
      subject_default : localStorageService.get('subject_name'),
      term : localStorageService.get('term'),
      year : localStorageService.get('year'),
      Lec_Name : Lec_Name
    };

    $http.post('/get_files_homework' ,data_send)
    .success(function(data ,status,headers,config)
    {
        $scope.files_name = [];
        for (var i=0 ; i<data.length ; i++)
        {
          $scope.files_name.push({name : data[i]});
        }
    })
    .error(function(data,status,headers,config){
    });


    $scope.remove_files = function (files_name , id){
      var data2 = {
        files_name : files_name,
        subject_default : localStorageService.get('subject_name'),
        subject :  localStorageService.get('subject_name'),
        term : localStorageService.get('term'),
        year : localStorageService.get('year'),
        Lec_Name : 'Archarn.Anek Thamrongvorakul',
        path : 'homework',
        id : id
      }

      $http.post ('/get_files' ,data2)
      .success(function(data){
        var x = document.getElementById("mySelect");
        var index = data.indexOf(files_name);
        x.remove(index);

          $http.post('/remove_files' , data2)
          .success(function(data ,status,headers,config)
          {

          })
          .error(function(data,status,headers,config){

          });

      })

    };


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
        var data = {
          path : 'homework',
          subject :  subject,
          subject_default : localStorageService.get('subject_name'),
          term : localStorageService.get('term'),
          year : localStorageService.get('year'),
          Lec_Name_Default : 'Archarn.Anek Thamrongvorakul',
          Lec_Name : Lec_Name,
          Date_Upload : moment().format('MMMM Do YYYY, h:mm:ss a')
        };
        item.formData.push(data);
        $http.post('/get_files')
        .success(function(data ,status,headers,config)
        {   $scope.files_name = [];
            for (var i=0 ; i<data.length ; i++)
            {
              $scope.files_name.push({name : data[i]});
            }
        })
        .error(function(data,status,headers,config){

        });




        //  console.log (item.file.name);
        //  console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function(fileItem, progress) {
         $scope.text_complete = '';
         if (progress  === 100)
         {
           $scope.text_complete = 'Uploaded';
         }
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




  }]);

app.controller('getfilesDocumentsController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'localStorageService' ,
    function ( $scope, $rootScope,Upload, $http , FileUploader ,localStorageService   )
    {

      $scope.description = 'ไฟล์เอกสาประกอบการเรียน';
      var todoList = this;
      $scope.name_of_file = '';
      $scope.detail = '5555';
      $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
      $scope.date_hw = "11-11-1111";
      $scope.button_file_name = '';
      var subject_split = localStorageService.get('subject_name').split(" ");
      var subject = '' ;
      for (var i=0 ;i<subject_split.length ; i++){subject = subject + subject_split[i]}
      var Lec_Name_default = 'Archarn.Anek Thamrongvorakul';
      var Lec_Name_split = Lec_Name_default.split(" ");
      var Lec_Name = '';
      for (var i=0 ;i<Lec_Name_split.length ; i++){Lec_Name = Lec_Name + Lec_Name_split[i]}
      var data_send = {
        subject :  subject,
        subject_default : localStorageService.get('subject_name'),
        term : localStorageService.get('term'),
        year : localStorageService.get('year'),
        Lec_Name : Lec_Name,
        path : "documents"
      };
      $http.post('/get_files_documents' ,data_send)
      .success(function(data ,status,headers,config)
      {   $scope.files_name = [];
          for (var i=0 ; i<data.length ; i++)
          {
            $scope.files_name.push({name : data[i]});
          }
      })
      .error(function(data,status,headers,config){
      });
      $scope.remove_files = function (files_name ,id){
        var data2 = {
          files_name : files_name,
          subject_default : localStorageService.get('subject_name'),
          subject :  localStorageService.get('subject_name'),
          term : localStorageService.get('term'),
          year : localStorageService.get('year'),
          Lec_Name : 'Archarn.Anek Thamrongvorakul',
          path : 'documents',
          id : id
        }

        $http.post ('/get_files' ,data2)
        .success(function(data){
          var x = document.getElementById("mySelect");
          var index = data.indexOf(files_name);
          x.remove(index);

            $http.post('/remove_files' , data2)
            .success(function(data ,status,headers,config)
            {

            })
            .error(function(data,status,headers,config){
            });
        })
      };

      var uploader = $scope.uploader = new FileUploader({
          url: '/postupload'

      });
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        };
        uploader.onAfterAddingFile = function(fileItem) {
        };
        uploader.onAfterAddingAll = function(addedFileItems) {

        };
        uploader.onBeforeUploadItem = function(item) {
          var data = {
            path : 'documents',
            subject :  subject,
            subject_default : localStorageService.get('subject_name'),
            term : localStorageService.get('term'),
            year : localStorageService.get('year'),
            Lec_Name_Default : 'Archarn.Anek Thamrongvorakul',
            Lec_Name : Lec_Name,
            Date_Upload : moment().format('MMMM Do YYYY, h:mm:ss a')
          }
          item.formData.push(data);
        
        };
        uploader.onProgressItem = function(fileItem, progress) {
        };
        uploader.onProgressAll = function(progress) {
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
        };
        uploader.onCompleteAll = function() {
        };

  }]);
app.controller('getfilesNewsController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$sce' ,'localStorageService' ,
      function ( $scope, $rootScope,Upload, $http , FileUploader , $sce , localStorageService )
      {
        var todoList = this;
        $scope.name_of_file = '';
        $scope.detail = '5555';
        $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
        $scope.button_file_name = '';
        $scope.VDO_Name = '';
        $scope.VDO_Link = '';
        $scope.VDO_Description = '';

        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }


        $scope.type_split_arr = localStorageService.get('subject_name').split(" ");
        $scope.type = '';
        for (var i =0 ; i< $scope.type_split_arr.length ; i++){$scope.type =  $scope.type + $scope.type_split_arr[i]+ '_' ;}
        $scope.term =localStorageService.get('term');
        $scope.year = localStorageService.get('year');
        var data_for_search = {
          "header" : {"index" : "news" , "type" : $scope.type },
          "data" : {"Subject_Term" : $scope.term + '/' + $scope.year}
        };

        $scope.files = [];
          $http.post('/get_files_news' , data_for_search)
          .success (function (data){
            for (var i=0 ;i<data.length ; i++){
              $scope.files.push({name : data[i]});
            }
        });
        $scope.news_message = '';

        $scope.remove_click = function (type,id){
          var data = {
            "header" : {
              index : 'news',
              type : type,
              id : id
            }
          }
          $http.post('/remove_news' , data)
          .success(function(){
            alert("ลบกล่องข้อความเรียบร้อย !!");
            location.reload();
          })

        };

        $scope.submit_news_message = function (){
          if ($scope.news_message !== "")
          {
            $scope.Lec_Name = 'Archarn.ANEK THAMRONGVORAKUL';
            $scope.type_split_arr = localStorageService.get('subject_name').split(" ");
            $scope.type = '';
            for (var i =0 ; i< $scope.type_split_arr.length ; i++){$scope.type =  $scope.type + $scope.type_split_arr[i]+ '_' ;}
            $scope.term =localStorageService.get('term');
            $scope.year = localStorageService.get('year');
            $scope.Message_Date_Upload = moment().format('MMMM Do YYYY, h:mm:ss a');

            var Json_data = {
              "header" : {"index" : "news" , "type" : $scope.type},
              "data" : {
                "Type" : "text",
                "Subject_Term" : $scope.term + '/' + $scope.year,
                "Subject_Name_Default" : localStorageService.get('subject_name'),
                "Lec_Name" : $scope.Lec_Name,
                "Message" : $scope.news_message,
                "Date_Upload" : $scope.Message_Date_Upload,
                "path_file_pic_icon": "img/Lecturer_Pic/2.1_profile.jpg",
                "path" : 'news'

              }
            };
            console.log($scope.type);
            $http.post('/insert_news_data' , Json_data)
            .success (function (){
                console.log("PUT NEWS's data to Elasticsearch success");
            })


            location.reload();
          }
          else {
            alert("กรุณาระบุข้อมูล");
          }

        };

        $scope.submit_news_click = function (){

          if ($scope.VDO_Name !== "")
          {
            $scope.Lec_Name = 'Archarn.ANEK THAMRONGVORAKUL';
            $scope.type_split_arr = localStorageService.get('subject_name').split(" ");
            $scope.type = '';
            for (var i =0 ; i< $scope.type_split_arr.length ; i++){$scope.type = $scope.type + $scope.type_split_arr[i]+ '_' ;}
            $scope.term =localStorageService.get('term');
            $scope.year = localStorageService.get('year');
            $scope.VDO_Date_Upload = moment().format('MMMM Do YYYY, h:mm:ss a');
            $scope.arr_link = $scope.VDO_Link.split("watch?v=");
            $scope.Embed_Link = $scope.arr_link[0] + 'embed/' + $scope.arr_link[1];


            var Json_data = {
              "header" : {"index" : "news" , "type" : $scope.type},
              "data" : {
                "Type" : "clip",
                "Subject_Term" : $scope.term + '/' + $scope.year,
                "Subject_Name_Default" : localStorageService.get('subject_name'),
                "Lec_Name" : $scope.Lec_Name,
                "Embed_Code" : $scope.Embed_Link,
                "Video_Name" : $scope.VDO_Name,
                "Description" : $scope.VDO_Description,
                "Date_Upload" : $scope.VDO_Date_Upload,
                "path_file_pic_icon": "img/Lecturer_Pic/2.1_profile.jpg",
                "path" : 'news'
              }
            };

            $http.post('/insert_news_data' , Json_data)
            .success (function (){
                console.log("PUT NEWS's data to Elasticsearch success");
            })


            location.reload();
          }
          else {
            alert("กรุณาระบุข้อมูล");
          }

        },

        $scope.remove_files = function (files_name){


          var data2 = {
            'files_name' : files_name
          }

          $http.post ('/get_files_news')

          .success(function(data){


            var x = document.getElementById("mySelect");
            var index = data.indexOf(files_name);
            x.remove(index);

              $http.post('/remove_files' , data2)
              .success(function(data ,status,headers,config)
              {

              })
              .error(function(data,status,headers,config){

              });

          })

        };





  }]);

app.controller('getfilesScoreController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'localStorageService' ,
        function ( $scope, $rootScope,Upload, $http , FileUploader ,localStorageService  )
        {
          $scope.description = 'ไฟล์เอกสาประกอบการเรียน';
          var todoList = this;
          $scope.name_of_file = '';
          $scope.detail = '5555';
          $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
          $scope.date_hw = "11-11-1111";
          $scope.button_file_name = '';

          var subject_split = localStorageService.get('subject_name').split(" ");
          var subject = '' ;
          for (var i=0 ;i<subject_split.length ; i++){subject = subject + subject_split[i]}
          var Lec_Name_default = 'Archarn.Anek Thamrongvorakul';
          var Lec_Name_split = Lec_Name_default.split(" ");
          var Lec_Name = '';
          for (var i=0 ;i<Lec_Name_split.length ; i++){Lec_Name = Lec_Name + Lec_Name_split[i]}

          var data_send = {
            subject :  subject,
            subject_default : localStorageService.get('subject_name'),
            term : localStorageService.get('term'),
            year : localStorageService.get('year'),
            Lec_Name : Lec_Name,
            path : "score"
          };
          $http.post('/get_files_score' ,data_send)
          .success(function(data ,status,headers,config)
          {   $scope.files_name = [];
              for (var i=0 ; i<data.length ; i++)
              {
                $scope.files_name.push({name : data[i]});
              }
          })
          .error(function(data,status,headers,config){
          });



          $scope.remove_files = function (files_name , id){
            var data2 = {
              files_name : files_name,
              subject_default : localStorageService.get('subject_name'),
              subject :  localStorageService.get('subject_name'),
              term : localStorageService.get('term'),
              year : localStorageService.get('year'),
              Lec_Name : 'Archarn.Anek Thamrongvorakul',
              path : 'score',
              id : id
            }

            $http.post ('/get_files' , data2)

            .success(function(data){


              var x = document.getElementById("mySelect");
              var index = data.indexOf(files_name);
              x.remove(index);

                $http.post('/remove_files' , data2)
                .success(function(data ,status,headers,config)
                {

                })
                .error(function(data,status,headers,config){

                });

            })

          };


          var uploader = $scope.uploader = new FileUploader({
              url: '/postupload'

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
              var data = {
                path : 'score',
                subject :  subject,
                subject_default : localStorageService.get('subject_name'),
                term : localStorageService.get('term'),
                year : localStorageService.get('year'),
                Lec_Name_Default : 'Archarn.Anek Thamrongvorakul',
                Lec_Name : Lec_Name,
                Date_Upload : moment().format('MMMM Do YYYY, h:mm:ss a')
              }
              item.formData.push(data);





              //  console.log (item.file.name);
              //  console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
               $scope.text_complete = '';
               if (progress  === 100)
               {
                 $scope.text_complete = 'Uploaded';
               }
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


  }]);
