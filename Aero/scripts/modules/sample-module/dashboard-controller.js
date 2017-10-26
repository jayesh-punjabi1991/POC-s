
define(['angular', './sample-module'], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', 'PredixAssetService', 'PredixViewService', '$http', '$interval', '$filter', '$rootScope', '$q','$timeout' ,function($scope, $log, PredixAssetService, PredixViewService, $http, $interval, $filter, $rootScope, $q,$timeout) {

        var startDate = moment().subtract(10,'minutes'),
            endDate = moment();
        var fromDate = startDate.format('YYYY-MM-DD');
        var fromTime = startDate.format('HH:mm:ss');
        var toDate = endDate.format('YYYY-MM-DD');
        var toTime = endDate.format('HH:mm:ss');
        var fromDate1,
            fromTime1,
            toDate1,
            toTime1;
        var shift=false;

        var count=20,
            count1=21;

        var myVar=null;
        var myVar1=null
        var interval=null;
        var interval1=null;
        var count2=0;
        var count3=0;

        var fromdateintextfield;
        var fromtimeintextfield;
        var todateintextfield;
        var totimeintextfield;

        $scope.loading=true;
        $rootScope.machnineNo = 810659;
        $scope.dataonload=[];
        $scope.datatoplotonload=[];
        $scope.dataonloadforAlarm=[];
        $scope.datatoplotonloadforAlarm=[];
        $scope.TimeSpanDataforTimeSeries=[];
        $scope.datatoplotforTimeSpanTimeSeries=[];
        $scope.TimeSpanDataforAlarm=[];
        $scope.datatoplotforTimeSpanforAlarm=[];
        $scope.dataoninputoftextfield=[];
        $scope.datatoplotoninputoftextfield=[];
        $scope.dataoninputoftextfieldforalarm=[];
        $scope.datatoplotoninputoftextfieldforalarm=[];

        $rootScope.arrayToSave=[];
        $scope.tableData;
        $scope.tagName="";

        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            chart: {
            style: {
            fontFamily: 'geInspira',
            fontWeight:'bold'

            }
         }
        });

        //Live Chart Button
        $scope.getLivechart=function(){
          document.getElementById("Livebutton").disabled = true;
          document.getElementById("Livebutton").style.backgroundColor="#e4e4ea";
          document.getElementById("Livebutton").style.color="black";
          document.getElementById("Livebutton").style.borderColor="#b1b1bc";
          $scope.OnloadFunction();
          $scope.OnLoadChartatInterval();
        }

        //Machine Number Dropdown Event
        document.getElementById('px-drop').addEventListener('px-dropdown-value-changed', function(event) {
            $rootScope.machnineNo = event.detail.val;
        });

        //Getting chart data at the current time for Onload
        $scope.OnloadFunction=function(){
          $scope.datatoplotonload=[];
          $scope.dataonload=[];
            $interval.cancel(interval1);
            $interval.cancel(myVar1);
        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo);
        //$http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo).then(function success(res) {

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=2016-10-07%2014:10:00%20&endDate=2016-10-07%2014:20:00&machineNumber=810659');
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=2016-10-07%2014:10:00%20&endDate=2016-10-07%2014:20:00&machineNumber=810659').then(function succes(res){
             $scope.dataonload=res.data;
             $scope.dataonload=$filter('orderBy')($scope.dataonload,'timestamp');
             angular.forEach($scope.dataonload,function(v,key){
                $scope.datatoplotonload.push({'x':v.timestamp,'y':v.value,'tag':v.tag.split(':')[1]})
             })
             $scope.tagName=$scope.dataonload[0].tag.split(':')[1];
            })

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo);
        //$http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo).then(function success(res) {

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=2016-10-07%2014:10:00%20&endDate=2016-10-07%2014:20:00&machineNumber=810659');
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=2016-10-07%2014:10:00%20&endDate=2016-10-07%2014:20:00&machineNumber=810659').then(function succes(res){
              $scope.dataonloadforAlarm=[];
              $scope.datatoplotonloadforAlarm=[];
             $scope.dataonloadforAlarm=res.data;
             $scope.dataonloadforAlarmTable=[];
             $scope.dataonloadforAlarmTable=res.data;
             $scope.dataonloadforAlarm=$filter('orderBy')($scope.dataonloadforAlarm,'alarmDate');
             angular.forEach($scope.dataonloadforAlarm,function(v,key){
                $scope.datatoplotonloadforAlarm.push({'x':v.alarmDate,'y':parseFloat(v.value),'tag':'Alarm'})
             })
             var timeout1=$timeout(function(){
              $scope.restofthedata=[];
             angular.forEach($scope.datatoplotonload,function(value,key){
              $scope.restofthedata.push({'x':value.x,'y':null,'tag':'Alarm'});
             })
             for(var i=0;i<$scope.datatoplotonloadforAlarm.length;i++){
              for(var j=0;j<$scope.datatoplotonload.length;j++){
                if($scope.datatoplotonloadforAlarm[i].x==$scope.datatoplotonload[j].x){
                  $scope.restofthedata[j].y=$scope.datatoplotonloadforAlarm[i].y;
                }
              }
             }
              $scope.loading=false;
             $scope.plotDefaultChartData($scope.datatoplotonload,$scope.restofthedata);
         },3000);
             angular.forEach($scope.dataonloadforAlarmTable,function(v,k){
                    v.alarmDate=moment.utc(v.alarmDate).format("YYYY-MM-DD HH:mm:ss");
                  });
             $scope.tableData = $scope.dataonloadforAlarmTable;
            })
    }
        $scope.OnloadFunction();

        //Function to get data at every one minute interval for the chart Onload
        $scope.OnLoadChartatInterval=function(){

            interval=$interval(function(){
            startDate = moment().subtract(1,'minutes'),
            endDate = moment();
            fromDate = startDate.format('YYYY-MM-DD');
            fromTime = startDate.format('HH:mm:ss');
            toDate = endDate.format('YYYY-MM-DD');
            toTime = endDate.format('HH:mm:ss');

          //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo);
          //$http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo).then(function success(res) {

          //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=2016-10-07%2014:'+count+':00%20&endDate=2016-10-07%2014:'+count1+':59&machineNumber=810659');
          $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=2016-10-07%2014:'+count+':00%20&endDate=2016-10-07%2014:'+count1+':59&machineNumber=810659').then(function succes(res){
             $scope.dataonload=[];
             $scope.datatoplotonload=[];
             $scope.dataonload=res.data;
             $scope.dataonload=$filter('orderBy')($scope.dataonload,'timestamp');
             count2=0;
            })

          //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo);
          //$http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=' + fromDate + '%20' + fromTime + '%20&endDate=' + toDate + '%20' + toTime + 'machineNumber='+$rootScope.machnineNo).then(function success(res) {

          //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=2016-10-07%2014:'+count+':00%20&endDate=2016-10-07%2014:'+count1+':59&machineNumber=810659');
          $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=2016-10-07%2014:'+count+':00%20&endDate=2016-10-07%2014:'+count1+':59&machineNumber=810659').then(function succes(res){
             $scope.dataforAlarmTable=[];
             $scope.dataonloadforAlarm=[];

             var dummy=[];
             $scope.dataforAlarmTable=res.data;
             $scope.dataonloadforAlarm=res.data;

            for(var i=0;i<$scope.dataforAlarmTable.length;i++){
              dummy.push({'alarmName':$scope.dataforAlarmTable[i].alarmName,'alarmDate':moment.utc($scope.dataforAlarmTable[i].alarmDate).format("YYYY-MM-DD HH:mm:ss"),'state':$scope.dataforAlarmTable[i].state,'severity':$scope.dataforAlarmTable[i].severity,'description': $scope.dataforAlarmTable[i].description,'value':$scope.dataforAlarmTable[i].value});
            }

             $scope.dataonloadforAlarm=$filter('orderBy')($scope.dataonloadforAlarm,'alarmDate');
             count2=0;
            myVar = setInterval(function(){ $scope.addpoints() }, 1000);
             if(dummy[0].length!=0){
              if($scope.tableData[$scope.tableData.length-1].alarmDate!=dummy[0].alarmDate){
             $scope.tableData.push(dummy[0]);
           }
         }
            })

            $scope.addpoints=function(){
                if(count2<$scope.dataonload.length){
                if($rootScope.chart.series[0].data.length+$rootScope.chart.series[1].data.length>26){
                    shift=true;
                }
                else{
                    shift=false;
                }
                $rootScope.chart.series[0].addPoint({x:$scope.dataonload[count2].timestamp,y:$scope.dataonload[count2].value,tag:$scope.dataonload[count2].tag.split(':')[1]},true,shift);
            if($scope.dataonloadforAlarm[count2]!=undefined){

                $rootScope.chart.series[1].addPoint({x:$scope.dataonloadforAlarm[count2].alarmDate,y:parseFloat($scope.dataonloadforAlarm[count2].value),tag:'Alarm'},true,shift);
            }
            else{
             $rootScope.chart.series[1].addPoint({x:$scope.dataonload[count2].timestamp,y:null},true,shift);
            }
            count2++;
            }
            else{
                clearInterval(myVar);
            }
        }
              count=count+1;
              count1=count1+1;
        },60000);

        }

        $scope.OnLoadChartatInterval();

        //function that draws the graph:
        $scope.plotDefaultChartData = function(data,data1) {
            var options = {

                chart: {
                    renderTo: 'container',
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    zoomType:'x',
                     backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(200, 200, 255)']
                ]
            }
                },
                title: {
                    text: 'Live Sensor data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150,
                    title:{
                        text:'Time'
                    },
                    dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y',
                  minute: '%H:%M- %e %b %Y',
                  second: '%H:%M:%S- %e %b %Y',
                  day: '%H:%M- %e %b %Y',
                  week: '%H:%M- %e %b %Y'
              },
                },
                 plotOptions: {
                    series: {
                        marker: {
                            enabled: true
                        },
                        animation: {
                            duration: 2000
                        }
                    },
                    spline: {
                         turboThreshold: 500000,
                     }
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.point.options.tag + '</b><br/>' + '<br/>' +
                            '<b>Value: </b>'+ Highcharts.numberFormat(this.y, 2) ;
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                annotationsOptions: {
                    enabledButtons: false
                },

                series: [{
                        name: $scope.tagName,
                        data: data
                    },
                    {
                        name: 'Alarm',
                        data: data1,
                        marker: {
                            symbol:'url(../images/live_status_offline_icon.png)'
                        },
                        type: 'scatter'
                    }
                ]
            }
            $rootScope.chart = new Highcharts.Chart(options);
        };

         //Dates selected from the calender:
        document.getElementById('rangePicker').addEventListener('px-datetime-range-submitted', function(e) {
            $scope.tableData = [];
            $interval.cancel(interval);
            $interval.cancel(myVar);
            fromDate1 = e.detail.range.from.split('T')[0];
            fromTime1 = e.detail.range.from.split('T')[1].slice(0, -5);
            toDate1 = e.detail.range.to.split('T')[0];
            toTime1 = e.detail.range.to.split('T')[1].slice(0, -5);

            /*document.getElementById("Livebutton").disabled = false;
          document.getElementById("Livebutton").style.backgroundColor="#3e87e8";
          document.getElementById("Livebutton").style.color="white";
          document.getElementById("Livebutton").style.borderColor="#2b5ea2";*/
        });
        document.getElementById('rangePicker').addEventListener('px-datetime-button-clicked',function(e){
            $scope.getTimeSpanData(fromDate1, fromTime1, toDate1, toTime1);
        })


        $scope.getTimeSpanData=function(fromDate1,fromTime1,toDate1,toTime1){
          $scope.loading=true;
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate=' + fromDate1 + '%20' + fromTime1 + '%20&endDate=' + toDate1 + '%20' + toTime1 + '&machineNumber='+$rootScope.machnineNo).then(function success(res) {
            $scope.TimeSpanDataforTimeSeries=[];
            $scope.datatoplotforTimeSpanTimeSeries=[];
            $scope.TimeSpanDataforTimeSeries=res.data;
              $scope.TimeSpanDataforTimeSeries=$filter('orderBy')($scope.TimeSpanDataforTimeSeries,'timestamp');
             angular.forEach($scope.TimeSpanDataforTimeSeries,function(v,key){
                $scope.datatoplotforTimeSpanTimeSeries.push({'x':v.timestamp,'y':v.value,'tag':v.tag.split(':')[1]});
             })
             var timeout4=$timeout(function(){
              $scope.loading=false;
             $scope.plotDefaultChartData($scope.datatoplotforTimeSpanTimeSeries,$scope.datatoplotforTimeSpanforAlarm);
           },10000);
        })
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate=' + fromDate1 + '%20' + fromTime1 + '%20&endDate=' + toDate1 + '%20' + toTime1 + '&machineNumber='+$rootScope.machnineNo).then(function success(res) {
            $scope.tableData = [];
            $scope.TimeSpanDataforAlarm=[];
            $scope.datatoplotforTimeSpanforAlarm=[];
            $scope.TimeSpanDataforAlarm=res.data;
              $scope.TimeSpanDataforAlarm=$filter('orderBy')($scope.TimeSpanDataforAlarm,'timestamp');
             angular.forEach($scope.TimeSpanDataforAlarm,function(v,key){
                $scope.datatoplotforTimeSpanforAlarm.push({'x':v.alarmDate,'y':parseFloat(v.value),'tag':'Alarm'})
             })
             angular.forEach(res.data,function(v,k){
                    v.alarmDate=moment.utc(v.alarmDate).format("YYYY-MM-DD HH:mm:ss");
            });
            $scope.tableData = res.data;
        })
        }

        //Textfield
        document.getElementById('datetextfield').addEventListener('px-datetime-submitted', function(e) {
          /*document.getElementById("Livebutton").disabled = false;
          document.getElementById("Livebutton").style.backgroundColor="#3e87e8";
          document.getElementById("Livebutton").style.color="white";
          document.getElementById("Livebutton").style.borderColor="#2b5ea2";*/
            $scope.datatoplotoninputoftextfieldforalarm=[];
            $scope.datatoplotoninputoftextfield=[];
            $scope.tableData = [];
            $interval.cancel(interval);
            $interval.cancel(myVar);
            $interval.cancel(interval1);
            $interval.cancel(myVar1);
            fromdateintextfield = e.detail.dateTime.split('T')[0];
            fromtimeintextfield = e.detail.dateTime.split('T')[1].slice(0,-5);
            var d = new Date(e.detail.dateTime);
            d.setMinutes(d.getMinutes() + 10);
            todateintextfield = d.toISOString().split('T')[0];
            totimeintextfield = d.toISOString().split('T')[1].slice(0,-5);
            $scope.getDatafromtextfielddates();
            $scope.loading=true;
        });

        $scope.getDatafromtextfielddates=function(){

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo);
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo).then(function succes(res){
             $scope.dataoninputoftextfield=res.data;
             $scope.dataoninputoftextfield=$filter('orderBy')($scope.dataoninputoftextfield,'timestamp');
             angular.forEach($scope.dataoninputoftextfield,function(v,key){
                $scope.datatoplotoninputoftextfield.push({'x':v.timestamp,'y':v.value,'tag':v.tag.split(':')[1]})
             })
            })

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo);
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo).then(function succes(res){
             $scope.dataoninputoftextfieldforalarm=res.data;
             $scope.dataoninputoftextfieldforalarm=$filter('orderBy')($scope.dataoninputoftextfieldforalarm,'timestamp');
             angular.forEach($scope.dataoninputoftextfieldforalarm,function(v,key){
                $scope.datatoplotoninputoftextfieldforalarm.push({'x':v.alarmDate,'y':parseFloat(v.value),'tag':'Alarm'})
             })
             angular.forEach(res.data,function(v,k){
                    v.alarmDate=moment.utc(v.alarmDate).format("YYYY-MM-DD HH:mm:ss");
            });
             $scope.tableData = res.data;
            })
        var timout3=$timeout(function(){
          $scope.loading=false;
        $scope.plotDefaultChartData($scope.datatoplotoninputoftextfield,$scope.datatoplotoninputoftextfieldforalarm);
        },5000);
        $scope.DataatIntervalfortextfields();
        }

        $scope.DataatIntervalfortextfields=function(){
          interval1=$interval(function(){
                      var tempfromdate=fromdateintextfield+"T"+fromtimeintextfield+"Z";
            var temptodate=todateintextfield+"T"+totimeintextfield+"Z";

            var d=new Date(tempfromdate);
            var d1=new Date(temptodate);
            var d2=new Date();
            d.setMinutes(d.getMinutes() + 10);
            d1.setMinutes(d1.getMinutes() + 10);

            fromdateintextfield = d.toISOString().split('T')[0];
            fromtimeintextfield = d.toISOString().split('T')[1].slice(0,-5);

            todateintextfield = d1.toISOString().split('T')[0];
            totimeintextfield = d1.toISOString().split('T')[1].slice(0,-5);

        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo);
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/gettimeseriesdata?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo).then(function succes(res){
             $scope.dataoninputoftextfield=[];
             $scope.datatoplotoninputoftextfield=[];
             $scope.dataoninputoftextfield=res.data;
             $scope.dataoninputoftextfield=$filter('orderBy')($scope.dataoninputoftextfield,'timestamp');
             angular.forEach($scope.dataoninputoftextfield,function(v,key){
                $scope.datatoplotoninputoftextfield.push({'x':v.timestamp,'y':v.value,'tag':v.tag.split(':')[1]})
             })
            })


        //console.log('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo);
        $http.get('https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/alarmList?startDate='+fromdateintextfield+'%20'+fromtimeintextfield+'%20&endDate='+todateintextfield+'%20'+totimeintextfield+'&machineNumber='+$rootScope.machnineNo).then(function succes(res){
             $scope.dataoninputoftextfieldforalarm=[];
             $scope.datatoplotoninputoftextfieldforalarm=[];
             var dummy1=[];
             $scope.dataoninputoftextfieldforalarm=res.data;
             for(var i=0;i<$scope.dataoninputoftextfieldforalarm.length;i++){
              dummy1.push({'alarmName':$scope.dataoninputoftextfieldforalarm[i].alarmName,'alarmDate':moment.utc($scope.dataoninputoftextfieldforalarm[i].alarmDate).format("YYYY-MM-DD HH:mm:ss"),'state':$scope.dataoninputoftextfieldforalarm[i].state,'severity':$scope.dataoninputoftextfieldforalarm[i].severity,'description': $scope.dataoninputoftextfieldforalarm[i].description,'value':$scope.dataoninputoftextfieldforalarm[i].value});
            }

         var flag=false;
         if(dummy1.length!=0){
          for(var i=0;i<dummy1.length;i++){
            flag=false;
            for(var j=0;j<$scope.tableData.length;j++){
                if(dummy1[i].alarmDate==$scope.tableData[j].alarmDate){
                  flag=true;
                }
            }
            if(flag==false){
            $scope.tableData.push(dummy1[i]);
          }
          }

         }
         //console.log($scope.tableData);
             $scope.dataoninputoftextfieldforalarm=$filter('orderBy')($scope.dataoninputoftextfieldforalarm,'timestamp');
             angular.forEach($scope.dataoninputoftextfieldforalarm,function(v,key){
                $scope.datatoplotoninputoftextfieldforalarm.push({'x':v.alarmDate,'y':parseFloat(v.value),'tag':'Alarm'})
             })
            })
        if(d1<d2){
          count3=0;
        myVar1 = setInterval(function(){ $scope.addpoints1() }, 3000);
    }
        $scope.addpoints1=function(){
                if(count3<$scope.datatoplotoninputoftextfield.length){
                if($rootScope.chart.series[0].data.length+$rootScope.chart.series[1].data.length>30){
                    shift=true;
                }
                else{
                    shift=false;
                }
                $rootScope.chart.series[0].addPoint({x:$scope.datatoplotoninputoftextfield[count3].x,y:$scope.datatoplotoninputoftextfield[count3].y,tag:$scope.datatoplotoninputoftextfield[count3].tag});

            if($scope.datatoplotoninputoftextfieldforalarm[count3]!=null){
                $rootScope.chart.series[1].addPoint({x:$scope.datatoplotoninputoftextfieldforalarm[count3].x,y:parseFloat($scope.datatoplotoninputoftextfieldforalarm[count3].y),tag:'Alarm'});
            }
            else{
             $rootScope.chart.series[1].addPoint({x:$scope.datatoplotoninputoftextfield[count3].x,y:null});
            }
            count3++;
            }
            else{
                clearInterval(myVar1);
            }
        }
          },45000);
        }

        //Save Data
        $scope.saveData = function() {
          document.getElementById("Save").disabled = true;
          document.getElementById("Save").style.backgroundColor="#b1b1bc";
        $http({
                method: 'POST',
                url: 'https://aeroc.run.aws-usw02-pr.ice.predix.io/aero/updateAlarm',
                data: $rootScope.arrayToSave,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(res) {
            });
        };
        document.getElementById("mytable").addEventListener("px-row-click", function(e) {
          document.getElementById("Save").disabled = false;
          document.getElementById("Save").style.backgroundColor="#2b5ea2";
            var clickedRow = e.detail.row;
            if (clickedRow._selected === false) {
                var selectedRow = clickedRow.row;

                var dataToSave ={"alarmName":selectedRow.alarmName.value,
                "alarmDate":(moment.utc(selectedRow.alarmDate.value).unix())*1000,
                "state":selectedRow.state.value,
                "severity":selectedRow.severity.value,
                 "description":selectedRow.description.value,
                 "value":selectedRow.value.value};
                if ($rootScope.arrayToSave.indexOf(dataToSave)=== -1) {
                  $rootScope.arrayToSave.push(dataToSave);
                }
            }
        });

    }]);
});
