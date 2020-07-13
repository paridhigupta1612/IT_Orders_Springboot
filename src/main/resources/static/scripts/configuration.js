'use strict';

console.log("Loading configuration...");
console.log("Location " + window.location.protocol + '//' + window.location.host + '/rest/server');

var application = {
    'page_size' : 10,
    'kieserver_container' : 'itorders',
    'kieserver_processId' : '',
    'kieserver_url' : window.location.protocol + '//' + window.location.host + '/rest/server',
    'suppliers' : [
       {'id': 'apple', 'name': 'Apple'},
       {'id': 'dell', 'name': 'Dell'},
       {'id': 'lenovo', 'name': 'Lenovo'},
       {'id': 'other', 'name': 'Other'}
   ],
   'managers' : [
      {'id': 'krisv', 'name': 'Kris'},
      {'id': 'mary', 'name': 'Mary'},
      {'id': 'paul', 'name': 'Paul'},
      {'id': 'maciek', 'name': 'Maciek'}
   ],
   'coreData' : [
    {value:2,type:1,cost:1000},
    {value:4,type:2,cost:2000},
    {value:8,type:3,cost:3000}
 ],
 'ramData':[
    {value:"8 GB",type:1,cost:1000},
    {value:"16 GB",type:2,cost:2000},
    {value:"32 GB",type:3,cost:3000}
    
  ],
  'storageData':[
    {value:"100 GB",type:1,cost:1000},
    {value:"500 GB",type:2,cost:2000},
    {value:"1 TB",type:3,cost:3000}
    
  ],
  'osData':[
    {value:"RHEL",type:1,cost:1000},
    {value:"Windows",type:2,cost:2000}
    
  ],
    "roles" : [
        {name: "tihomir", value: "Manager"},
        {name: "maciek", value: "Employee"},
        {name: "krisv", value: "Manager"},
        {name: "paul", value: "Manager"}
    ],
    "Designation":'',
    "Department":''
};
