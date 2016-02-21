var app = angular.module('getfiles', ['ngFileUpload' , 'angularFileUpload' ,'ngSanitize','LocalStorageModule' ]);

app.controller('getfilesHomeworkController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,'localStorageService' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader  ,localStorageService )
  {
    $scope.description = 'ไฟล์การบ้าน';
    $scope.date = '11-11-2559';

    $http.post('/get_files_homework').success(function(data){
      $scope.files = [];

      for (var i=0 ; i<data.length ; i++){
        $scope.files.push({name : data[i]});
      }
    });

    console.log(localStorageService.get('subject_name'));

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

    console.log($scope.date_log);




    $http.post('/get_files_homework' , {
      subject :  localStorageService.get('subject_name'),
      term : localStorageService.get('term'),
      year : localStorageService.get('year'),
      Lec_Name : 'Archarn.Anek Thamrongvorakul'
    })
    .success(function(data ,status,headers,config)
    {   $scope.files_name = [];
        for (var i=0 ; i<data.length ; i++)
        {
          console.log(data[i]);
          $scope.files_name.push({name : data[i]});
        }
    })
    .error(function(data,status,headers,config){
    });


    $scope.remove_files = function (files_name){
      var data2 = {
        files_name : files_name,
        subject :  localStorageService.get('subject_name'),
        term : localStorageService.get('term'),
        year : localStorageService.get('year'),
        Lec_Name : 'Archarn.Anek Thamrongvorakul',
        path : 'homework'
      }

      $http.post ('/get_files')

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
        item.formData.push({path:'homework',
                            subject :  localStorageService.get('subject_name'),
                            term : localStorageService.get('term'),
                            year : localStorageService.get('year'),
                            Lec_Name : 'Archarn.Anek Thamrongvorakul'
                            });
        $http.post('/get_files')
        .success(function(data ,status,headers,config)
        {   $scope.files_name = [];
            for (var i=0 ; i<data.length ; i++)
            {
              $scope.files_name.push({name : data[i]});
              console.log(data[i]);
            }
        })
        .error(function(data,status,headers,config){

        });

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

      console.log( localStorageService.get('subject_name'));
      $http.post('/get_files_documents').success(function(data){
        $scope.files = [];

        for (var i=0 ; i<data.length ; i++){
          $scope.files.push({name : data[i]});
        }
      });



      $scope.remove_files = function (files_name){
        var data2 = {
          files_name : files_name,
          subject :  localStorageService.get('subject_name'),
          term : localStorageService.get('term'),
          year : localStorageService.get('year'),
          Lec_Name : 'Archarn.Anek Thamrongvorakul',
          path : 'homework'        }

        $http.post ('/get_files_documents')

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
          item.formData.push({path:'documents',
                              subject :  localStorageService.get('subject_name'),
                              term : localStorageService.get('term'),
                              year : localStorageService.get('year'),
                              Lec_Name : 'Archarn.Anek Thamrongvorakul'
                              });
          $http.post('/get_files')
          .success(function(data ,status,headers,config)
          {   $scope.files = [];
              for (var i=0 ; i<data.length ; i++)
              {
                $scope.files.push({name : data[i]});
                console.log(data[i]);
              }
          })
          .error(function(data,status,headers,config){

          });

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
app.controller('getfilesNewsController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' , '$sce' ,
      function ( $scope, $rootScope,Upload, $http , FileUploader , $sce  )
      {
        $scope.description = 'ไฟล์เอกสาประกอบการเรียน';
        var todoList = this;
        $scope.name_of_file = '';
        $scope.detail = '5555';
        $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
        $scope.date_hw = "11-11-1111";
        $scope.button_file_name = '';

        $scope.VDO_Name = '';
        $scope.VDO_Link = '';
        $scope.VDO_Description = '';
        $scope.files = [];

        var data_for_search = {
          "header" : {"index" : "news" , "type" : $scope.type }
        };

        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }



        $http.post('/get_files_news' , data_for_search)
        .success (function (data){


          for (var i=0 ;i<data.length ; i++)
          {
            $scope.vdovdo = data[i]["_source"]["Embed_Code"];

            $scope.files.push({name : data[i]});
          }

        });

        $scope.submit_news_click = function (){

          if ($scope.VDO_Name !== "")
          {
            $scope.Lec_Name = 'Archarn.ANEK THAMRONGVORAKUL';
            $scope.type = "ANALYSIS_AND_DESIGN_OF_ALGORITHMS";
            $scope.VDO_Date_Upload = moment().format('MMMM Do YYYY, h:mm:ss a');
            $scope.arr_link = $scope.VDO_Link.split("watch?v=");
            $scope.Embed_Link = $scope.arr_link[0] + 'embed/' + $scope.arr_link[1];


            var Json_data = {
              "header" : {"index" : "news" , "type" : $scope.type},
              "data" : {
                "Type" : "clip",
                "Subject_Term" : "2/2557",
                "Lec_Name" : $scope.Lec_Name,
                "Embed_Code" : $scope.Embed_Link,
                "Video_Name" : $scope.VDO_Name,
                "Description" : $scope.VDO_Description,
                "Date_Upload" : $scope.VDO_Date_Upload
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

            $http.post('/get_files')
            .success(function(data ,status,headers,config)
            {   $scope.files = [];
                for (var i=0 ; i<data.length ; i++)
                {
                  $scope.files.push({name : data[i]});
                  console.log(data[i]);
                }
            })
            .error(function(data,status,headers,config){

            });

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

app.controller('getfilesScoreController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,
        function ( $scope, $rootScope,Upload, $http , FileUploader   )
        {
          $scope.description = 'ไฟล์เอกสาประกอบการเรียน';
          var todoList = this;
          $scope.name_of_file = '';
          $scope.detail = '5555';
          $scope.date_log = moment().format('MMMM Do YYYY, h:mm:ss a');
          $scope.date_hw = "11-11-1111";
          $scope.button_file_name = '';


          $http.post('/get_files_score').success(function(data){
            $scope.files = [];

            for (var i=0 ; i<data.length ; i++){
              $scope.files.push({name : data[i]});
            }
          });



          $scope.remove_files = function (files_name){
            var data2 = {
              files_name : files_name,
              subject :  localStorageService.get('subject_name'),
              term : localStorageService.get('term'),
              year : localStorageService.get('year'),
              Lec_Name : 'Archarn.Anek Thamrongvorakul',
              path : 'homework'
            }

            $http.post ('/get_files_score')

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
              item.formData.push({path:'score',
                                  subject :  localStorageService.get('subject_name'),
                                  term : localStorageService.get('term'),
                                  year : localStorageService.get('year'),
                                  Lec_Name : 'Archarn.Anek Thamrongvorakul'
                                  });
              $http.post('/get_files')
              .success(function(data ,status,headers,config)
              {   $scope.files = [];
                  for (var i=0 ; i<data.length ; i++)
                  {
                    $scope.files.push({name : data[i]});
                    console.log(data[i]);
                  }
              })
              .error(function(data,status,headers,config){

              });

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
