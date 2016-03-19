
var app = angular.module('mailbox_view', [ 'angular-momentjs','LocalStorageModule' , 'ngSanitize']);
app.controller('mailboxviewController', ['$scope', '$http' , '$moment','localStorageService' , '$sce',
  function ( $scope, $http  , $moment ,  localStorageService , $sce )
  {
    $scope.Fullname_User = localStorageService.get('Fullname_User');
    $scope.path_file_pic_icon = localStorageService.get('path_file_pic_icon');
    $http.post('/search_mailbox_subject' , {
      mailbox_id : localStorageService.get('mailbox_id'),
      Lec_Name : localStorageService.get('Fullname_User'),
      Subject : localStorageService.get('mailbox_subject')
    })
    .success(function(data){
      $scope.subject = data[0]["_source"]["Subject"];
      $scope.message = $sce.trustAsHtml(data[0]["_source"]["Message"]);
      $scope.date = data[0]["_source"]["Date"];
      $scope.Std_Name = data[0]["_source"]["Std_Name"];
      $scope.Lec_Name = data[0]["_source"]["Lec_Name"];
    });

  }]);
