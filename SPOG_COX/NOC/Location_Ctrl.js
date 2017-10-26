define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('LocationCtrl', ['$scope', '$filter','$log', '$http','PredixAssetService', 'PredixViewService', function ($scope, $filter,$log, $http,PredixAssetService, PredixViewService) {



        $scope.requestDataSet={
            "region":"CENTRAL",
            "market":"TULSA",
            "headend":"Super Headend",
            "nods_devics":"",
            "serviceimpacted":"DATA",
            "sub_service":"",
            "channel":"",
            "customers_impacted":"Cox Business",
            "customer_platform":"Rovi",
            "customer_bundle":"",
            "service_impaction":"",
            "elapsed_time":0,
            "tool_name":"Netcool",
            "device_type":"",
            "group_owner":"",
            "agent":"SCOTT LECHEVET",
            "groupType":"AGENT"
        }

        $scope.incidentCommander;
        $scope.bridge;
        $scope.communicate;
        $scope.shout;
        $scope.queues;
        /*TreGrid*/
        var tree;

        $scope.tree_data = [];
        $scope.tree_data1 = [];
        $scope.tree_data2= [];
        $scope.tree_data3= [];
        $scope.my_tree = tree = {};
        $scope.expanding_property = "Location";
        $scope.expanding_property1 = "Customer/Service";
        $scope.expanding_property2 = "Status";
        $scope.expanding_property3 = "Audit";
        $scope.col_defs = [
        ];
        var renderCount=0;
        $scope.updateTreegridTable= function(dataSet){
            $scope.incidentCommander=dataSet[0].incidentCommander;
            $scope.bridge=dataSet[0].bridge;
            $scope.communicate=null;
            $scope.shout=dataSet[0].shout;
            $scope.queues=dataSet[0].queues;
            var rawTreeData = [{
                "DemographicId": 1,
                "ParentId": null,
                "Location": dataSet[0].region

                }, {
                "DemographicId": 2,
                "ParentId": 1,
                "Location": dataSet[0].market
                },
                {
                "DemographicId": 3,
                "ParentId": 2,
                "Location": dataSet[0].headend
                },
                {
                "DemographicId": 4,
                "ParentId": 3,
                "Location": dataSet[0].nods_devics
                }
            ];
            var rawTreeData1 = [{
                "DemographicId": 1,
                "ParentId": null,
                "Customer/Service": dataSet[0].serviceimpacted

                }, {
                "DemographicId": 2,
                "ParentId": 1,
                "Customer/Service": dataSet[0].sub_service
                },
                {
                "DemographicId": 3,
                "ParentId": 1,
                "Customer/Service": dataSet[0].channel
                },
                {
                "DemographicId": 4,
                "ParentId": null,
                "Customer/Service": dataSet[0].customers_impacted
                }, {
                "DemographicId": 5,
                "ParentId": 4,
                "Customer/Service": dataSet[0].customer_platform
                },
                {
                "DemographicId": 6,
                "ParentId": 4,
                "Customer/Service": dataSet[0].customer_bundle
                },
                {
                "DemographicId": 7,
                "ParentId": null,
                "Customer/Service": dataSet[0].service_impaction
                }
            ];

            var rawTreeData2 = [{
                "DemographicId": 1,
                "ParentId": null,
                "Status": "Status of the Issue"
                },
                {
                "DemographicId": 2,
                "ParentId": 1,
                "Status": dataSet[0].elapsed_time
                }
            ];

            var rawTreeData3 = [{
                "DemographicId": 1,
                "ParentId": null,
                "Audit": "Data Governance"

                }, {
                "DemographicId": 2,
                "ParentId": 1,
                "Audit": dataSet[0].tool_name
                }, {
                "DemographicId": 3,
                "ParentId": 1,
                "Audit": dataSet[0].device_type
                },{
                "DemographicId": 4,
                "ParentId": 1,
                "Audit": "Key Owner ?"
                }, {
                "DemographicId": 5,
                "ParentId": 4,
                "Audit": dataSet[0].group_owner
                }, {
                "DemographicId": 6,
                "ParentId": 4,
                "Audit": dataSet[0].agent
                }
            ];
            $scope.makeTreeGrid(rawTreeData);
            $scope.makeTreeGrid(rawTreeData1);
            $scope.makeTreeGrid(rawTreeData2);
            $scope.makeTreeGrid(rawTreeData3);
        }


$scope.makeTreeGrid=function(rawTreeData){
    var myTreeData = getTree(rawTreeData, 'DemographicId', 'ParentId');
if(renderCount==0){
   $scope.tree_data = myTreeData;
}
else if(renderCount==1){
   $scope.tree_data1 = myTreeData;
}
else if(renderCount==2){
   $scope.tree_data2 = myTreeData;
}
else if(renderCount==3){
   $scope.tree_data3 = myTreeData;
}
else{
    renderCount=0;
}
renderCount++;

  $scope.my_tree_handler = function(branch) {
    //console.log('you clicked on', branch)
  }

  function getTree(data, primaryIdName, parentIdName) {
    if (!data || data.length == 0 || !primaryIdName || !parentIdName)
      return [];

    var tree = [],
      rootIds = [],
      item = data[0],
      primaryKey = item[primaryIdName],
      treeObjs = {},
      parentId,
      parent,
      len = data.length,
      i = 0;

    while (i < len) {
      item = data[i++];
      primaryKey = item[primaryIdName];
      treeObjs[primaryKey] = item;
      parentId = item[parentIdName];

      if (parentId) {
        parent = treeObjs[parentId];

        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      } else {
        rootIds.push(primaryKey);
      }
    }

    for (var i = 0; i < rootIds.length; i++) {
      tree.push(treeObjs[rootIds[i]]);
    };

    return tree;
  }

}





/*treegrid*/
        var xyz={
        "region":"CENTRAL",
        "market":"TULSA",
        "headend":"Super Headend",
        "nods_devics":"",
        "serviceimpacted":"DATA",
        "sub_service":"",
        "channel":"",
        "customers_impacted":"Business",
        "customer_platform":"Rovi",
        "customer_bundle":"",
        "service_impaction":"",
        "elapsed_time":0,
        "tool_name":"Netcool",
        "device_type":"",
        "group_owner":"",
        "agent":"SCOTT LECHEVET",
        "groupType":"AGENT"
        }


    $scope.locations = [
      ['BALLOU', 36.14,-95.177, 1]
    ];

    $scope.renderMap=function(locations){
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new google.maps.LatLng(36.14, -95.177),
          mapTypeId: google.maps.MapTypeId.ROADMAP
          //mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        //var infowindow = new google.maps.InfoWindow();

         var marker, i;

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
    }

    $scope.renderMap($scope.locations);

        $scope.tableDataSet;
        $scope.renderTable=function(res){
            $scope.tableDataSet=res;
            //debugger
        }

        /*Table Sort*/
        /*$scope.propertyName = 'age';
        $scope.reverse = true;
        $scope.friends = orderBy(friends, $scope.propertyName, $scope.reverse);*/
        $scope.propertyName = 'age';
        $scope.sortBy = function(propertyName) {
          $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
              ? !$scope.reverse : false;
          $scope.propertyName = propertyName;
          $scope.friends = orderBy($scope.tableDataSet, $scope.propertyName, $scope.reverse);
        };

        $scope.dataRequest=function(rData){

           $http.post('https://noc-singlepaneofglass.run.aws-usw02-pr.ice.predix.io/noc/search', rData, {headers: {
                        "Content-Type": "application/json"
            }})
            .success(function (res) {


                $scope.renderTable(res);
                $scope.responseDataSet=res;
                //debugger
            });
        }



        $scope.updateIncident= function(ino){
            debugger
            var incidentInfo=$filter('filter')($scope.responseDataSet,ino);
            var mapData=[['BALLOU',incidentInfo[0].latitude,incidentInfo[0].longitude, 20]]
            $scope.renderMap(mapData);
            $scope.updateTreegridTable(incidentInfo);
            //debugger
        }

        $scope.groupAgent=false;
        $scope.toggleOwner=function(ga){
            //debugger
            $scope.groupAgent=!$scope.groupAgent;
            if(ga==false){
                $scope.requestDataSet.group_owner=$scope.org.name;
                $scope.requestDataSet.agent="";
            }
            else{
                $scope.requestDataSet.group_owner="";
                $scope.requestDataSet.agent=$scope.agent.name;
            }
        }
        $scope.locations=[{
                        "name": "ALL",
                        "lable": "ALL"
                    },{
                        "name": "CENTRAL",
                        "lable": "CENTRAL"
                    }, {
                        "name": "EAST",
                        "lable": "EAST"
                    }, {
                        "name": "WEST",
                        "lable": "WEST"
                    },{
                        "name": "SOUTH",
                        "lable": "SOUTH"
                    }]
        $scope.location=$scope.locations[0];
        $scope.regions=[{
                            "name": "TULSA",
                            "lable": "TULSA"
                        },
                        {
                            "name": "OMAHA",
                            "lable": "OMAHA"
                        },
                        {
                            "name": "KANSAS",
                            "lable": "KANSAS"
                        }
                    ]
        //$scope.region=$scope.regions[0];

        $scope.regionDataSet={
            "CENTRAL": [
                        {
                            "name": "TULSA",
                            "lable": "TULSA"
                        },
                        {
                            "name": "OMAHA",
                            "lable": "OMAHA"
                        },
                        {
                            "name": "KANSAS",
                            "lable": "KANSAS"
                        }
                    ],



            "EAST": [
                        {
                            "name": "ATLANTA",
                            "lable": "ATLANTA"
                        },
                        {
                            "name": "HAMPTON ROADS",
                            "lable": "HAMPTON ROADS"
                        },
                        {
                            "name": "ROANOKE",
                            "lable": "ROANOKE"
                        }
                    ]   ,

            "WEST": [
                        {
                            "name": "SANTA BARBARA",
                            "lable": "SANTA BARBARA"
                        },
                        {
                            "name": "LAS VEGAS",
                            "lable": "LAS VEGAS"
                        }
                    ] ,

            "NORTH": [
                        {
                            "name": "NEW ENGLAND",
                            "lable": "NEW ENGLAND"
                        },
                        {
                            "name": "NORTHERN VIRGINIA",
                            "lable": "NORTHERN VIRGINIA"
                        }
                    ],

            "SOUTH": [
                        {
                            "name": "NEW ORLEANS",
                            "lable": "NEW ORLEANS"
                        },
                        {
                            "name": "BATON ROUGE",
                            "lable": "BATON ROUGE"
                        },
                        {
                            "name": "PHOENIX",
                            "lable": "PHOENIX"
                        }
                    ]

            }


        $scope.headEnds=[{
            "name": "Super Headend",
            "lable": "Super Headend"
        }, {
            "name": "Market Center Headend",
            "lable": "Market Center Headend"
        }]
        $scope.headEnd=$scope.headEnds[0];

        $scope.nodeData=[{
            "name": "SNVLSYSC01",
            "lable": "SNVLSYSC01 "
        }, {
            "name": "WICHTSMT01KSKS",
            "lable": "WICHTSMT01KSKS"
        },{
            "name": "IOLASYSC02",
            "lable": "IOLASYSC02 "
        }, {
            "name": "CTUL0CAP001",
            "lable": "CTUL0CAP001"
        },{
            "name": "CBTR0SC0INS012",
            "lable": "CBTR0SC0INS012 "
        }, {
            "name": "NWPTVALSNASR02",
            "lable": "NWPTVALSNASR02"
        }]
        $scope.noded=$scope.nodeData[0];

        $scope.serviceImpactedData=[{
            "name": "ALL",
            "lable": "ALL"
        },{
            "name": "VIDEO",
            "lable": "VIDEO"
        }, {
            "name": "DATA",
            "lable": "DATA"
        }, {
            "name": "Telephony",
            "lable": "Telephony"
        }]
        $scope.si=$scope.serviceImpactedData[0];

        $scope.subServiceDataSet={
        "VIDEO" : [
                    {
                        "name": "CBS_VIDEO",
                        "lable": "CBS_VIDEO"
                    },
                    {
                        "name": "VIDEO_CENTRALIZED_CVM",
                        "lable": "VIDEO_CENTRALIZED_CVM"
                    },
                    {
                        "name": "VIDEO_CENTRALIZED_DIGITAL",
                        "lable": "VIDEO_CENTRALIZED_DIGITAL"
                    },
                    {
                        "name": "VIDEO_CENTRALIZED_FACILITIES",
                        "lable": "VIDEO_CENTRALIZED_FACILITIES"
                    },
                    {
                        "name": "VIDEO_CENTRALIZED_INTERACTIVE",
                        "lable": "VIDEO_CENTRALIZED_INTERACTIVE"
                    },
                    {
                        "name": "VIDEO_CENTRALIZED_OTT",
                        "lable": "VIDEO_CENTRALIZED_OTT"
                    }
                ],
        "DATA" : [
                    {
                        "name": "Data Basic",
                        "lable": "Data Basic"
                    },
                    {
                        "name": "Data Pro",
                        "lable": "Data Pro"
                    },
                    {
                        "name": "Data Ultimate",
                        "lable": "Data Ultimate"
                    }
                ],
        "Telephony" : [
                    {
                        "name": "Regular",
                        "lable": "Regular"
                    },
                    {
                        "name": "VoIP",
                        "lable": "VoIP"
                    }
                ]
        }


        $scope.subServiceSelectedData;

        $scope.videoChannels;
        $scope.videoChannelsData={
        "VIDEO" : [
                    {
                        "name": "CNN",
                        "lable": "CNN"
                    },
                    {
                        "name": "ESPN",
                        "lable": "ESPN"
                    },
                    {
                        "name": "BBC",
                        "lable": "BBC"
                    },
                    {
                        "name": "FOX",
                        "lable": "FOX"
                    },
                    {
                        "name": "TBC",
                        "lable": "TBC"
                    }
                ]
        }


        $scope.subServiceSelectedData="";//$scope.subServiceDataSet["VIDEO"];
        $scope.sssb="";//$scope.subServiceSelectedData[0];


        $scope.serviceImpactedSpecific= function(sssb){
            angular.forEach($scope.subServiceDataSet, function(v, k){
                if(sssb.lable==k){
                    //debugger
                    if(sssb.lable=="VIDEO"){
                        $scope.videoChannels=$scope.videoChannelsData["VIDEO"];
                        $scope.subServiceSelectedData=$scope.subServiceDataSet[k];
                        console.log(JSON.stringify($scope.subServiceSelectedData));
                    }
                    else{
                        $scope.videoChannels=[];
                        $scope.subServiceSelectedData=$scope.subServiceDataSet[k];
                        console.log(JSON.stringify($scope.subServiceSelectedData));
                    }

                }
            });
        }


        $scope.videoChannels="";//$scope.videoChannelsData["VIDEO"];
        $scope.video=$scope.videoChannelsData["VIDEO"][0];
        //debugger

        $scope.customersImpacted=[{
            "name": "Business",
            "lable": "Business "
        }, {
            "name": "Hospitality",
            "lable": "Hospitality "
        }, {
            "name": "Residential",
            "lable": "Residential "
        }]
        $scope.ci=$scope.customersImpacted[0];

        $scope.customerPlatforms=[{
            "name": "Rovi",
            "lable": "Rovi "
        }, {
            "name": "Contour",
            "lable": "Contour "
        }, {
            "name": "Contour2",
            "lable": "Contour2 "
        },{
            "name": "DTA",
            "lable": "DTA "
        }, {
            "name": "STB",
            "lable": "STB "
        }, {
            "name": "EMTA",
            "lable": "EMTA "
        },{
            "name": "OTA",
            "lable": "OTA "
        }]
        $scope.cp=$scope.customerPlatforms[0];

        $scope.customerPlan=[{
            "name": "Cox Bronze Bundle",
            "lable": "Cox Bronze Bundle"
        }, {
            "name": "Cox Silver Bundle",
            "lable": "Cox Silver Bundle"
        }, {
            "name": "Cox Gold Bundle",
            "lable": "Cox Gold Bundle"
        }]
        $scope.cPlan=$scope.customerPlan[0];


        $scope.serviceAffecting=[{
            "name": "Service Affecting",
            "lable": "Service Affecting"
        }, {
            "name": "Non-Service Affecting",
            "lable": "Non-Service Affecting"
        }]
        $scope.saf=$scope.serviceAffecting[0];

        $scope.elapsedTime=[
            {
                "name": "2Hr",
                "value": "2"
            },
            {
                "name": "4Hr",
                "value": "4"
            },
            {
                "name": "6Hr",
                "value": "6"
            },
            {
                "name": "8Hr",
                "value": "8"
            },
            {
                "name": "10Hr",
                "value": "10"
            },
            {
                "name": "12Hr",
                "value": "12"
            },
            {
                "name": "14Hr",
                "value": "14"
            }
        ]

        $scope.toolNotified=[
            {
                "name": "Netcool",
                "value": "NETCOOL"
            },
            {
                "name": "RTOC",
                "value": "RTOC"
            },
            {
                "name": "TnC",
                "value": "TNC"
            }
        ]
        $scope.nt=$scope.toolNotified[0];

        $scope.deviceAlarmed=[
            {
                "name": "HFC Node",
                "value": "HFC Node"
            },
            {
                "name": "Tap",
                "value": "Tap"
            },
            {
                "name": "Node",
                "value": "Node"
            },{
                "name": "Amplifier",
                "value": "Amplifier"
            },
            {
                "name": "Splitter",
                "value": "Splitter"
            },
            {
                "name": "Power Supply",
                "value": "Power Supply"
            }
        ]
        $scope.da=$scope.deviceAlarmed[0];

        $scope.ownerRGroup=[{
            "name": "CAL - ORG - OSP NORTH",
            "value": "CAL - ORG - OSP NORTH"
        }, {
            "name": "CAL - ORG - OSP SOUTH",
            "value": "CAL - ORG - OSP SOUTH"
        }, {
            "name": "CAL - REG - OPERATIONS DOCSIS",
            "value": "CAL - REG - OPERATIONS DOCSIS"
        }, {
            "name": "CEN - OKC - OSP ZONE 1",
            "value": "CEN - OKC - OSP ZONE 1"
        }, {
            "name": "CEN - OKC - OSP ZONE 3",
            "value": "CEN - OKC - OSP ZONE 3"
        },{
            "name": "CEN - OMA - OSP ZONE 1",
            "value": "CEN - OMA - OSP ZONE 1"
        }, {
            "name": "CEN - REG - OPERATIONS DOCSIS",
            "value": "CEN - REG - OPERATIONS DOCSIS"
        }]
        $scope.org=$scope.ownerRGroup[0];

        $scope.agents=[{
            "name": "SCOTT LECHEVET",
            "value": "SCOTT LECHEVET"
        }, {
            "name": "BRANDON CALLEN",
            "value": "BRANDON CALLEN"
        }, {
            "name": "JAMES KRESKY",
            "value": "JAMES KRESKY"
        }]
        $scope.agent=$scope.agents[0];

        $scope.regionSpecific= function(region){
            angular.forEach($scope.regionDataSet, function(v, k){
                if(region.lable==k){
                    $scope.regions=$scope.regionDataSet[k];
                    console.log(JSON.stringify($scope.regions));
                    $scope.requestData();
                }
            });

        }
        $scope.marketSpecific= function(ms){
            $scope.requestData();
        }
        $scope.headEndSpecific= function(hes){
            $scope.requestData();
        }
        $scope.nodeSpecific= function(ns){
            $scope.requestData();
        }
        $scope.nodeDataSpecific= function(nds){
            $scope.requestData();
        }

        /*Put code here*/





        /*Pie*/
         $scope.updateChart=function(day) {
    // console.log(angular.toJson($scope.crPrScrapRateData)+" "+day)
      /*var speedChart = new Highcharts.Chart({
            chart: {
                type: 'pie',
                renderTo: 'speed_chart',
                backgroundColor: '#fff',//'#dedfe0',
                //plotBorderWidth: 0,
                plotShadow: false,
                margin: 0
            },
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                enabled: false,
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    size: '120%',
                    //borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        distance: -10,
                        style: {
                            //fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '128%']

                },
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                //dataLabels: {
                //            color:'white',
                //            distance: -10,
                //            formatter: function () {
                //                return this.y+'%';

                //            }
                //              },
                innerSize: '70%',
                data: [{
                    name: 'Red slice',
                    y: $scope.crPrScrapRateData[0][0],
                    color: '#fbf305'
                }, {
                    name: 'Green slice',
                    y: 20-$scope.crPrScrapRateData[0][0],
                    color: '#434348'
                }]
            },
            {
                type: 'pie',
                name: 'Chart 2',
                background: 'red',
                innerSize: '85%',
                data: [{
                    name: 'Red slice',
                    y: $scope.crPrScrapRateData[0][1],
                    color: '#34a853'
                }, {
                    name: 'Green slice',
                    y: 20-$scope.crPrScrapRateData[0][1],
                    color: '#434348'
                }]
            }],
            legend: {
                enabled: false
            },
            credits:{
                enabled: false
            },

            exporting: {
                enabled: false
            },
            annotationsOptions: {
                enabledButtons: false
            }
      })*/

}

        /*Pie END*/
        $scope.requestData=function(){

           /* $scope.requestDataSet.region=$scope.location.name;
            $scope.requestDataSet.market=$scope.region.name;
            $scope.requestDataSet.headend=$scope.headEnd.name;
            $scope.requestDataSet.nods_devics=$scope.noded.name;

            $scope.requestDataSet.serviceimpacted=$scope.si.name;
            $scope.requestDataSet.sub_service=$scope.sssb.name;
            $scope.requestDataSet.channel=$scope.video.name;
            $scope.requestDataSet.customers_impacted=$scope.ci.name;
            $scope.requestDataSet.customer_platform=$scope.cp.name;

            $scope.requestDataSet.customer_bundle=$scope.cPlan.name;

            $scope.requestDataSet.service_impaction=$scope.saf.name;

            $scope.requestDataSet.elapsed_time=0;
            $scope.requestDataSet.tool_name=$scope.nt.name;
            $scope.requestDataSet.device_type=$scope.da.name;

            $scope.requestDataSet.group_owner="";
            $scope.requestDataSet.agent=$scope.agent.name;
            $scope.requestDataSet.groupType="AGENT";
*/


           /* ---------------------------- */
            $scope.requestDataSet.region=$scope.location.name;

            if($scope.location.name!=="ALL"){
              $scope.requestDataSet.market="";
            }
            else{
                if($scope.region==undefined){
                    $scope.requestDataSet.market="";
                }
                else{
                    $scope.requestDataSet.market=$scope.region.name;
                }
              //debugger
            }
            $scope.requestDataSet.headend=$scope.headEnd.name;
            $scope.requestDataSet.nods_devics=$scope.noded.name;

            $scope.requestDataSet.serviceimpacted=$scope.si.name;
            $scope.requestDataSet.sub_service=$scope.sssb.name;
            $scope.requestDataSet.channel=$scope.video.name;
            $scope.requestDataSet.customers_impacted=$scope.ci.name;
            $scope.requestDataSet.customer_platform=$scope.cp.name;

            $scope.requestDataSet.customer_bundle=$scope.cPlan.name;

            $scope.requestDataSet.service_impaction=$scope.saf.name;

            $scope.requestDataSet.elapsed_time=0;
            $scope.requestDataSet.tool_name=$scope.nt.name;
            $scope.requestDataSet.device_type=$scope.da.name;

            $scope.requestDataSet.group_owner=$scope.org.name;
            $scope.requestDataSet.agent="";//$scope.agent.name;
            $scope.requestDataSet.groupType="AGENT";

           console.log(JSON.stringify($scope.requestDataSet));
           $scope.dataRequest($scope.requestDataSet)
        }
        $scope.requestData();

    }]);
});
