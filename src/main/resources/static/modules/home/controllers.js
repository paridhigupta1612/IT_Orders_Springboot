'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', '$location','sharedStateService', 'Page',
    function ($scope, $rootScope, $location, sharedStateService, Page) {
        $scope.Page = Page;
        $scope.Page.setTitle("New Hardware Order");
        $scope.user = $rootScope.globals.currentUser.username;
        $scope.userrole = $rootScope.globals.currentUser.role;
        $scope.serverInfo = $rootScope.kieServer;
        $scope.date = new Date();
        $scope.selectedType = "";
        $scope.estimate = "";
        $scope.selecValues={
          selectedcore:'',
          selectedRam:'',
          selectedStorage:'',
          selectedOS:'',
          qty:'',
          estimatedCost:0,
        ShowHide: function () {
          this.estimatedCost = (parseInt(this.selectedcore) + parseInt(this.selectedRam )+ 
          parseInt(this.selectedStorage) + parseInt(this.selectedOS)) * parseInt(this.qty);
          
        },
        initiateEstimation: function () {
          this.estimatedCost = 0;
        }
      }
      if ($scope.userrole == "Manager") {
            $location.path("/managertasks");
        }
        /*if($scope.userrole == "Supplier") {
            $location.path("/suppliertasks");
        }*/

        $scope.go = function ( path ) {
            $location.path( path );
          };


          $scope.selectType = function(type) {
            $scope.selectedType = type;
            sharedStateService.setSelectedType(type);
          };

          
          //configs

          /*$scope.coreData = [
            {value:"2 ",type:1,cost:10},
            {value:"4",type:2,cost:20},
            {value:"8",type:3,cost:30}
            
          ];
         
          $scope.ramData = [
            {value:"8 GB",type:1,cost:10},
            {value:"16 GB",type:2,cost:20},
            {value:"32 GB",type:3,cost:30}
            
          ];
          $scope.storageData = [
            {value:"100 GB",type:1,cost:10},
            {value:"500 GB",type:2,cost:20},
            {value:"1 TB",type:3,cost:30}
          ];
          $scope.osData = [
            {value:"RHEL",type:1,cost:10},
            {value:"Windows",type:2,cost:20}
          ];*/

          
    }])

.controller('HeaderController',
        ['$scope', '$rootScope', '$location',
            function ($scope, $rootScope, $location)  {
                $scope.isActive = function (viewLocation) {
                    return viewLocation === $location.path();
                }
    }])

   
   .directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  }])
  
  .service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function(file, uploadUrl){
          var fd = new FormData();
          fd.append('file', file);
          $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(function(){
          })
          .error(function(){
          });
      }
  }])
  
  .controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
      
      $scope.uploadFile = function(){
          var file = $scope.myFile;
          console.log('file is ' );
          console.dir(file);
          var uploadUrl = "/fileUpload";
          fileUpload.uploadFileToUrl(file, uploadUrl);
      };
      
  }])

  .controller("EditCtrl", ["$scope", "$filter",
  function($scope, $filter) {
   var date = $filter('date')(date, "dd/MM/yyyy");
    var dateAsDate = new Date(date);
  }
]);
  
/*function MainCtrl($scope, dateFilter) {
    $scope.date = new Date();
    
    $scope.$watch('date', function (date)
    {
        $scope.dateString = dateFilter(date, 'yyyy-MM-dd');
        console.log('A', $scope.date, $scope.dateString);
    });
    
    $scope.$watch('dateString', function (dateString)
    {
        $scope.date = new Date(dateString);
        console.log('B', $scope.date, $scope.dateString);
    });
}

 /*.controller('DatepickerDemoCtrl', function ($scope) {
        $scope.today = function() {
          $scope.dt = new Date();
        };
        $scope.today();
      
        $scope.clear = function () {
          $scope.dt = null;
        };
      
        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
      
        $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);
      
        $scope.open = function($event) {
          $scope.status.opened = true;
        };
      
        $scope.setDate = function(year, month, day) {
          $scope.dt = new Date(year, month, day);
        };
      
        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };
      
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
      
        $scope.status = {
          opened: false
        };
      
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
          [
            {
              date: tomorrow,
              status: 'full'
            },
            {
              date: afterTomorrow,
              status: 'partially'
            }
          ];
      
        $scope.getDayClass = function(date, mode) {
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);
      
            for (var i=0;i<$scope.events.length;i++){
              var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
      
              if (dayToCheck === currentDay) {
                return $scope.events[i].status;
              }
            }
          }
      
          return '';
        };
      });
*/
      
  

   

   /* var count = 1;
    var countEl = document.getElementById("count");
    function plus(){
        count++;
        countEl.value = count;
    }
    function minus(){
      if (count > 1) {
        count--;
        countEl.value = count;
      }  
    } 
    
    
      angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
    angular.module('ui.bootstrap.demo')*/
