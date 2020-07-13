'use strict';

angular.module('Manager')
.controller('ManagerTaskController',
    ['$scope', '$rootScope', '$location', 'ManagerService', 'sharedStateService', 'appConfig', 'Page',
        function ($scope, $rootScope, $location, ManagerService, sharedStateService, appConfig, Page) {
            $scope.user = $rootScope.globals.currentUser.username;
            /*$scope.orderNumber = "";*/
            $scope.taskId = "";
            $scope.caseId = "";
            $scope.page = 0;
            $scope.pageSize = appConfig.get('page_size');
            $scope.prevButtonStyle = "display:none";
            $scope.nextButtonStyle = "";
            $scope.Page = Page;
            $scope.Page.setTitle("Pending Approvals");
            $scope.roles = ['owner', 'manager'];


            ManagerService.GetTasks(appConfig.get('kieserver_url'), $scope.page, $scope.pageSize, function (response) {
            console.log(response);
            //console.log($scope.selecValues);
                if (response.success) {
                    $scope.tasks = response.data;
                    $location.path('/managertasks');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    console.log(failed); 
                }
            });

            $scope.selected = function(taskId) {

                $scope.taskId = taskId;
                console.log($scope.taskId);
                
            }
           
            $scope.reload = function(taskId) {

                ManagerService.GetTasks(appConfig.get('kieserver_url'), $scope.page, $scope.pageSize, function (response) {

                    if (response.success) {
                        $scope.tasks = response.data;
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            }

            /*$scope.claimAndGetTask = function () {
                ManagerService.ClaimAndGetTask(appConfig.get('kieserver_url'), $scope.taskId, function (response) {
                    console.log(response);
                    if (response.success) {
                        $scope.task = response.data;
                        //$scope.hardwareSpec = $scope.task['task-input-data']['_hwSpec']['org.jbpm.document.service.impl.DocumentImpl'];
                        //$scope.downloadLink = appConfig.get('kieserver_url') + "/documents/" + $scope.hardwareSpec.identifier + "/content";
                        //$location.path('/placeorder/' + $routeParams.orderTaskId);
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
        };*/
       // $scope.selected1 = function(caseId) {

         //   $scope.caseId = caseId;
        //    console.log($scope.caseId);
            
       // }
           $scope.claimAndGetTask = function (caseId) {
            $scope.caseId = caseId;
            console.log($scope.caseId);
                ManagerService.ClaimAndGetTask(appConfig.get('kieserver_url'), $scope.caseId, function (response) {
                    console.log(response);
                    if (response.success) {
                        $scope.cases = response.data;
                        console.log("$scope.cases.case-file.case-data");
                        console.log($scope.cases['case-file']['case-data']);
                        $scope.pardhiObj=$scope.cases['case-file']['case-data'];
                        
                        //$scope.hardwareSpec = $scope.task['task-input-data']['_hwSpec']['org.jbpm.document.service.impl.DocumentImpl'];
                        //$scope.downloadLink = appConfig.get('kieserver_url') + "/documents/" + $scope.hardwareSpec.identifier + "/content";
                        //$location.path('/placeorder/' + $routeParams.orderTaskId);
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
        };

            $scope.approve = function() {
                //$scope.claimAndGetTask();
                var data = {
                    "managerComment_" : $scope.approveComment,
                    "approved_" : true,
                    "approved" : true,
                    "caseFile_managerComment" : $scope.approveComment,
                    "caseFile_managerDecision" : true
                };
                
                ManagerService.CompleteTask(appConfig.get('kieserver_url'), $scope.taskId, data, function (response) {
                    console.log(data);
                    console.log($scope.taskId);
                    if (response) {
                        $scope.reload();
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
                
            };

            $scope.reject = function() {
                var data = {
                    "managerComment_" : $scope.rejectComment,
                    "approved_" : false,
                    "approved" : false,
                    "caseFile_managerComment" : $scope.rejectComment,
                    "caseFile_managerDecision" : false
                };
                ManagerService.CompleteTask(appConfig.get('kieserver_url'), $scope.taskId, data, function (response) {

                    if (response) {
                        $scope.reload();
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };

            $scope.prevPage = function() {
                $scope.page = $scope.page - 1;
                if ($scope.page == 0) {
                    $scope.prevButtonStyle = "display:none";
                }
                ManagerService.GetTasks(appConfig.get('kieserver_url'), $scope.page, $scope.pageSize, function (response) {

                    if (response.success) {
                        $scope.tasks = response.data;
                        $scope.nextButtonStyle = "";

                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };

            $scope.nextPage = function() {
                $scope.page = $scope.page + 1;
                if ($scope.page > 0) {
                    $scope.prevButtonStyle = "";
                }
                ManagerService.GetTasks(appConfig.get('kieserver_url'), $scope.page, $scope.pageSize, function (response) {

                    if (response.success) {
                        $scope.tasks = response.data;
                        if ($scope.tasks.length < $scope.pageSize) {
                            $scope.nextButtonStyle = "display:none";
                        }
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };

    }]);
