'use strict';

angular.module('Orders')

.factory('OrderService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};

        service.initOrder = function (serverUrl, owner, core , RAM , storage , OS ,estimated, callback) {
            var data = {
              "case-data" : {
                  /*"vendor" : supplier.id, */
                  "core": core,
                  "RAM": RAM,
                  "storage": storage,
                  "OS": OS,
                  "order" : {
                    "org.jbpm.demo.itorders.Order" : {
                      
                      "amount" : estimated
                    }
                }
              },
              
              "case-user-assignments" : {
                "owner" : owner,
                "manager" : 'krisv' ,
                },
              "case-group-assignments" : {
                /*"manager" : approver ,*/
             }
            };
            
            $http({method: 'POST', url: serverUrl + "/containers/itorders/cases/itorders.orderhardware/instances",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                data : data}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 201, message : status, data : data};
                        console.log(data);
                        console.log(response);
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.GetInstances = function (serverUrl, page, pageSize, callback) {

            $http({method: 'GET', url: serverUrl + "/queries/cases/instances?page=" + page + "&pageSize=" + pageSize}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 200, message : status, data : data['instances']};
                        console.log(response);
                        callback(response);

                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };
        
        service.GetMyInstances = function (serverUrl, owner, page, pageSize, callback) {

            $http({method: 'GET', url: serverUrl + "/queries/cases/instances?page=" + page + "&pageSize=" + pageSize + "&owner=" + owner + "&status=open&status=closed&status=cancelled"}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 200, message : status, data : data['instances']};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.GetInstance = function (serverUrl, caseId, callback) {
            console.log(caseId);
            $http({method: 'GET', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "?withMilestones=true&withRoles=true&withData=true"}).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        var response = { success: status == 200, message : status, data : data};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.GetTasksForOrder = function (serverUrl, caseId, page, pageSize, callback) {
            console.log(caseId);
            $http({method: 'GET', url: serverUrl + "/queries/cases/instances/" + caseId + "/tasks/instances/pot-owners?page=" + page + "&pageSize=" + pageSize}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 200, message : status, data : data['task-summary']};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.GetComments = function (serverUrl, caseId , callback) {

            $http({method: 'GET', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/comments"}).
                    success(function(data, status, headers, config) {

                        var response = { success: status == 200, message : status, data : data['comments']};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : "" + data};
                        callback(response);
                    });    
        };

        service.addComment = function (serverUrl, caseId , commentText, restrictedTo, callback) {

        	var restrictions = "";
        	
        	if (restrictedTo.length > 0) {
        		for (var i = 0; i < restrictedTo.length; i++) { 
        			restrictions += "restrictedTo=" + restrictedTo[i] + "&";
        		}
        	} else {
        		restrictions = "restrictedTo=_public_";
        	}
        	
            $http({method: 'POST', url: serverUrl + "/containers/itorders/cases/instances/" + caseId  + "/comments?" + restrictions,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                data : '"' + commentText + '"'}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 201, message : status, data : data};

                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.DeleteComment = function (serverUrl, caseId, commentId, callback) {


            $http({method: 'DELETE', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/comments/"+commentId}).
                    success(function(status, headers, config) {

                        callback(true);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.UpdateComment = function (serverUrl, caseId, commentId, commentText, restrictedTo, callback) {

        	var restrictions = "";
        	
        	if (restrictedTo.length > 0) {
        		for (var i = 0; i < restrictedTo.length; i++) { 
        			restrictions += "restrictedTo=" + restrictedTo[i] + "&";
        		}
        	} else {
        		restrictions = "restrictedTo=_public_";
        	}
            $http({method: 'PUT', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/comments/"+commentId + "?" + restrictions,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                data : '"' + commentText + '"'}).
                    success(function(status, headers, config) {

                        callback(true);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };
        
        service.GetMilestonesForOrder = function (serverUrl, caseId , callback) {

            $http({method: 'GET', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/milestones?achievedOnly=true"}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 200, message : status, data : data['milestones']};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };

        service.CloseCase = function (serverUrl, caseId , value, callback) {

        	$http({method: 'POST', url: serverUrl + "/containers/itorders/cases/instances/" + caseId ,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                    data :  '"' + value + '"' }).
                    success(function(status, headers, config) {
                    	var response = { success: true};
                        callback(response);
                    }).
                    error(function(data, status, headers, config) {
                    	
                        var response = { success: false, message : "" + data};
                        callback(response);
                    });
        
        };
        
        service.PutCaseData = function (serverUrl, caseId , name, value, callback) {

            $http({method: 'POST', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/caseFile/"+name,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                data :  value }).
                    success(function(status, headers, config) {

                        callback(true);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };
        
        service.ClaimAndGetTask = function (serverUrl, taskId, callback) {
        	
            $http({method: 'GET', url: serverUrl + "/containers/itorders/tasks/" + taskId + "?withInputData=true"}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 200, message : status, data : data};

                        if (data['task-status'] == 'Ready') {
                            $http({method: 'PUT', url: serverUrl + "/containers/itorders/tasks/" + taskId + "/states/claimed"}).
                                    success(function(data, status, headers, config) {
                                        callback(response);

                                    }).
                                    error(function(data, status, headers, config) {

                                        console.error("Error when claiming task " + taskId + " status code " + status + " data " + data);
                                    });
                        } else {
                            callback(response);
                        }
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };
        
        service.CompleteSurvey = function (serverUrl, taskId, survey, callback) {

        	var data = {
                    "survey_" : {
                    	"Survey" : survey
                    }
                  };
        		
                  $http({method: 'PUT', url: serverUrl + "/containers/itorders/tasks/" + taskId + "/states/completed?auto-progress=true",
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  },
                  data : data}).
                          success(function(status, headers, config) {
                              callback(true);

                          }).
                          error(function(data, status, headers, config) {

                              console.error("Error when claiming task " + taskId + " status code " + status + " data " + data);
                          });
        };
        
        service.requestManagerApproval = function (serverUrl, requestor, caseId , callback) {
            var data = {
            		"name" : "MgrApproval",
            		"description" : "Additional request for approval of " + caseId,
            		"actors" : "manager",
            		"data": {           
		              "orderNumber" : caseId ,
		              "requestor" : requestor
		            }
            };

            $http({method: 'POST', url: serverUrl + "/containers/itorders/cases/instances/" + caseId + "/tasks",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                data : data}).
                    success(function(data, status, headers, config) {
                        var response = { success: status == 201, message : status, data : data};

                        callback(response);
                    }).
                    error(function(data, status, headers, config) {

                        var response = { success: false, message : status};
                        callback(response);
                    });
        };
        
        return service;
    }]);
