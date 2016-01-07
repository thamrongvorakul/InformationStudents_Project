  angular.module('automatedApp', ['ngFileUpload'])
  .controller('automatedController', ['$scope','Upload', '$http', function($scope, Upload, $http)
    {
        var todoList = this;
        todoList.todos = [];
        todoList.feedname = [];
        todoList.fname = [];
        var radiovalue = '';
        todoList.nameupload = 'No File Chosen.';
        $http.get('/api/json/Feeds_GetFeeds').success(function(data, status, headers, config)
    {
      for(var i=0;i<data.length;i++)
      {
          todoList.feedname.push({name : data[i]['Feed_Name']});
      }
    }).error(function(data, status, headers, config)
    {
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

    }]);
