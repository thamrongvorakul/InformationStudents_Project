angular.module('contactsLec', ['ngFileUpload' , 'angularFileUpload' ])
.controller('contactslecController', ['$scope','$rootScope','Upload', '$http', 'FileUploader' ,
  function ( $scope, $rootScope,Upload, $http , FileUploader  )
  {
      $scope.wisan = "อ.วิสันต์ ตั้งวงษ์เจริญ";
      $scope.sangkorn = "อ.ศังกรศรัณย์ ล่องชูผล";
      $scope.rungrat = "ดร.รุ่งรัตน์ เวียงศรีพนาวัลย์";
      $scope.santana = "อ.สันธนะ อู่อุดมยิ่ง";
      $scope.tirawat="รศ.ธีรวัฒน์ ประกอบผล";
      $scope.jiraporn = "ผศ.ดร.จีรพร วีระพันธุ์";
      $scope.nantika = "ผศ.ดร.นันทิกา เบญจเทพานันท์";
      $scope.sarun = "ผศ.ดร.ศรัณย์ อินทโกสุม";
      $scope.siriluk = "ผศ.สิริลักษณ์ อนันต์สถิตย์สิน";
      $scope.nuansawat= "ผศ.ดร.นวลสวาท หิรัญสกลวงศ์";
      $scope.kritsada = "ผศ.กฤษฎา บุศรา";
      $scope.anantaporn = "ดร.อนันตพร ศรีสวัสดิ์";
      $scope.warangkana = "ดร.วรางคณา กิ้มปาน";
      $scope.saichon = "อ.สายชล ใจเย็น";
      $scope.teera = "อ.ธีระ ศิริธีรากุล";
      var data = {
        "name" : ''
      };


      $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      $scope.wisan_click = function (){


        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

         data = {
          "name" : $scope.wisan
        }
        $http.post('/test_login2' , data).success(function(data){

          location.href = '/profilelec' ;

        });

        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

      }

      $scope.sangkorn_click = function (){

        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

         data = {
          "name" : $scope.sangkorn
        }
        $http.post('/test_login2' , data).success(function(data){

          location.href = '/profilelec' ;

        });
        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

      }

      $scope.rungrat_click = function (){

        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

         data = {
          "name" : $scope.rungrat
        }
        $http.post('/test_login2' , data).success(function(data){

          location.href = '/profilelec' ;

        });
        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

      }

      $scope.santana_click = function (){

        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

         data = {
          "name" : $scope.santana
        }
        $http.post('/test_login2' , data).success(function(data){

          location.href = '/profilelec' ;

        });
        $http.post('/reset_count_name' , data).success(function(data){
            console.log('reset value in count_name');
        });

      }


      $scope.tirawat_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.tirawat
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }


      $scope.jiraporn_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.jiraporn
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.nantika_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.nantika
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }


      $scope.sarun_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.sarun
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.siriluk_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.siriluk
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }


      $scope.nuansawat_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.nuansawat
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.kritsada_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.kritsada
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.anantaporn_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.anantaporn
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.warangkana_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.warangkana
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.saichon_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.saichon
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }

      $scope.teera_click = function (){

          $http.post('/reset_count_name' , data).success(function(data){
              console.log('reset value in count_name');
          });

          data = {
          "name" : $scope.teera
          }
          $http.post('/test_login2' , data).success(function(data){

            location.href = '/profilelec' ;

          });
          $http.post('/reset_count_name' , data).success(function(data){
          console.log('reset value in count_name');
      });

      }
  }]);
