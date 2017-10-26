
cisco.controller('DonutCtrl', function($scope, $filter,$http) {
	
	// Adding for default selection -- Praveen
     $('#MenuBar1 a').removeClass("activemenu");
     $('#liDonut a').addClass("activemenu");
     // End
         $scope.d=new Date();
    $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +$scope.d.getDate();

    $scope.month=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
       $scope.Date2=$scope.month[$scope.d.getMonth()]+","+($scope.d.getDate()) ;
	
	document.getElementById("Dayd").onchange = function() {
   var dayvalue=document.getElementById("Dayd").value;
   if(dayvalue=="today"){
        $scope.selectDateDonut('today');
          $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +$scope.d.getDate();
          $scope.Date2=$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;
   }
   else if(dayvalue=="yesterday"){
        $scope.selectDateDonut('yesterday');
         $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +($scope.d.getDate()-1);
         $scope.Date2=$scope.month[$scope.d.getMonth()]+","+($scope.d.getDate()-1) ;
   }
   else if(dayvalue=="this week"){
     
     $scope.DurationTitle=$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;    

        $scope.selectDateDonut('this week');
   }
 
};
   document.getElementById("Locationd").onchange = function() {
   var Locationvalue=document.getElementById("Locationd").value;
   if(Locationvalue=="0"){
        $scope.selectAreaDonut(0);
   }
   else if(Locationvalue=="16"){
        $scope.selectAreaDonut(16);
   }
   else if(Locationvalue=="44"){
        $scope.selectAreaDonut(44);
   }
    else if(Locationvalue=="25"){
        $scope.selectAreaDonut(25);
   }
 
};


$scope.selectAreaDonut=function(val){
        
        if (val==0){
            $scope.areacoded="16,44,25";
            $scope.getDataforDonut($scope.dayd,$scope.areacoded);            
       
        }
        else{
            $scope.areacoded=val;
            $scope.getDataforDonut($scope.dayd,$scope.areacoded);
       
        }
    }
$scope.selectDateDonut=function(val){
        $scope.dataforchart="loading";
        if(val=='today'){
               $scope.dayd='today';
            
         $scope.getDataforDonut($scope.dayd,$scope.areacoded);
         
      }
      else if(val=='yesterday'){
             $scope.dayd='yesterday';
       
         $scope.getDataforDonut($scope.dayd,$scope.areacoded);
         
      }
      else if(val=='this week'){
             $scope.dayd='this week';
        $scope.getDataforDonut($scope.dayd,$scope.areacoded);
        
      }
    };
	
	$scope.rows=[];    
     $scope.dataforchartd="loading";
     $scope.dayd='today';
      $scope.areacoded="16,25,44";



$scope.getDataforDonut=function(val1,val2){  
 
  if(val1=='this week'){
	   $scope.dayd=val1;
	  var body={
		"timeRange":"00:00-23:59",
		"period":val1,
		"allAreas":val2,
		"granularity":"tag",
		"targetAreas":60,
		"durationCategories":"0-1440",
		"entirePeriod":true,
		"yAxis": "absoluteVisits"

	};
	$scope.areaTotal=0;
	$scope.data_for_chart=[];
	  
	  $http.post("https://msesandbox.cisco.com:8081/api/analytics/v1/deviceCrossover", body, {
       headers: {
        "Content-Type": "application/json"
        },
        transformResponse : function(data){
            return data;
        }

    }).success(function(data, status, headers, config) {
		$scope.rows = JSON.parse(data);
		$scope.data_for_chart = [];
		
		var dataLabel=  {name: 'Proprietary or Undetectable', y: 0.2,dataLabels: {enabled: false }}
		var count=0;
        for(var i=0;i < $scope.rows.results.length;i++){       
			
			var chartData=[];
			
			$scope.areaTotal=$scope.rows.targets.total;
			$scope.targetinAreas = $scope.rows.results[i].crossoverFromTargetIntoArea;
			$scope.areainTargets = $scope.rows.results[i].crossoverFromAreaIntoTarget;
			var areaPercntageCor =0;
			$scope.Date2=$scope.month[$scope.d.getMonth()]+","+(($scope.d.getDate()-$scope.d.getDay())+1)+"  -  "+$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;
			$scope.Date1=$scope.month[$scope.d.getMonth()]+","+(($scope.d.getDate()-$scope.d.getDay())+1)+"  -  "+$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;
		


			areaPercntageCor =  $scope.targetinAreas*100/$scope.areaTotal;
			targetPercntageCor=  $scope.areainTargets*100/$scope.areaTotal;
			
			 if(areaPercntageCor!=0 && targetPercntageCor!=0 ){
			var targetName = $scope.rows.results[i].area;	
				chartData[0]=targetName;
				chartData[1]=parseInt(areaPercntageCor);
				chartData[2]=parseInt(targetPercntageCor);
				chartData[3]=parseInt($scope.targetinAreas);
				chartData[4]=parseInt($scope.areainTargets);
				chartData[5]=parseInt($scope.areaTotal);
				$scope.data_for_chart[count]=chartData;
				count=count+1;
				//console.log(chartData);
            }
		}
			sessionStorage.setItem("visitrs",$scope.areaTotal)
			sessionStorage.setItem("zone",$scope.rows.targets.areas[0].area);
			//$scope.data_for_chart[$scope.rows.results.length]=dataLabel;
			console.log("#############################################");
			console.log($scope.data_for_chart);
			 Highcharts.chart('container10', {
        chart: {
            plotBackgroundColor: null,
			useHTML: true,
            plotBorderWidth: 0,
            plotShadow: false,
			events: {
                load: function () {
				
				 //this.renderer.text('<g class="crossover-target" width="49.199999999999996" height="49.199999999999996" transform="translate(229.5, 205)"><text class="crossover-target-title" style="text-anchor: middle;"><tspan y="-137.76" fill="#000000" style="font-size: 26px;">Zone3</tspan><tspan y="-118.07999999999998" x="0" fill="#666666" style="font-size: 15px;">Focus Area</tspan></text><ellipse class="crossover-target-ellipse" rx="49.199999999999996" ry="49.199999999999996" fill="#e9e9e9" stroke="#ffffff" stroke-width="5"></ellipse><text class="crossover-target-value" style="text-anchor: middle;"><tspan y="0" fill="#455d75" style="font-size: 22.14px;">21</tspan><tspan y="16.4" x="0" fill="#666666" style="font-size: 12.3px;">Visits</tspan></text></g>').attr({
                      //   zIndex: 101 
                    //}).add(); 
				 //$(".highcharts-root").append('<svg class="crossover-target" z-index= "101" width="49.199999999999996" height="49.199999999999996" transform="translate(229.5, 205)"><text class="crossover-target-title" style="text-anchor: middle;"><tspan y="-137.76" fill="#000000" style="font-size: 26px;">Zone3</tspan><tspan y="-118.07999999999998" x="0" fill="#666666" style="font-size: 15px;">Focus Area</tspan></text><ellipse class="crossover-target-ellipse" rx="49.199999999999996" ry="49.199999999999996" fill="#e9e9e9" stroke="#ffffff" stroke-width="5"></ellipse><text class="crossover-target-value" style="text-anchor: middle;"><tspan y="0" fill="#455d75" style="font-size: 22.14px;">21</tspan><tspan y="16.4" x="0" fill="#666666" style="font-size: 12.3px;">Visits</tspan></text></svg>');
				  $("#svgcontainer").html('<svg width="100" height="100"><circle cx="40" cy="40" r="30" stroke="green" stroke-width="0" fill="#e9e9e9"></circle><text x="27" y="42" fill="black">'+sessionStorage.getItem("visitrs")+' </text><text x="27" y="60" fill="black">visits</text></svg>');
				  $("#textcontainer").html('<svg width="70%" height="25%"><text x="27" y="42" fill="black" style="font-weight: bold">'+sessionStorage.getItem("zone")+' </text><text x="39" y="60" fill="black">  Focus Area</text></svg>');
				}
		    }
        },
        title: {
            text: ''
        },
		tooltip: {
		      useHTML: true,
		      formatter: function() {                     			
                        return '<center><b>'+this.key 
						+ '</b></center><br>There is correlation of <b>' +this.y
						+ '% </b>('+this.series.userOptions.data[this.point.x][3]
						+'/'+this.series.userOptions.data[this.point.x][5]
						+')between devices seen in <b>'+sessionStorage.getItem("zone")+'</b> and <b>'
						+this.key+'</b><br>There is a correlation of <b>'
						+this.series.userOptions.data[this.point.x][2]+'% </b>('
						+this.series.userOptions.data[this.point.x][4]+'/'
						+this.series.userOptions.data[this.point.x][5]
						+')between devices seen in <b>'
						+this.key+'</b> and <b>'+sessionStorage.getItem("zone")+'</b><br><br>Correlation refers to the devices seen in both areas during the time and date selected above';	
						
                    } 
            
        },
        subtitle: {
            text: ''
        },		
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: 10,
					formatter : function(){					
					 return '<b>'+this.series.userOptions.data[this.point.x][1]+'</b>%<br>'+this.key;
					},
                    style: {                        
                        color: 'black'
                    }
                },
                startAngle:20,
                endAngle: 340,
                center: ['50%', '50%']
            }
        },
        series: [{
		    type: 'pie',
            name: 'Delivered amount',
			innerSize: '50%',
            data: $scope.data_for_chart
			
        }],
		credits:{
                enabled: true
            },

            exporting: {
                enabled: false
            }


    });
			
			
    }).error(function(data, status, headers, config) {
       $scope._error = data;
    });
	  
	  
	  
  }else{
	   $scope.dayd=val1;	  
	  
	   var body={
		"timeRange":"00:00-23:59",
		"period":val1,
		"allAreas":val2,
		"granularity":"tag",
		"targetAreas":60,
		"durationCategories":"0-1440",
		"entirePeriod":true,
		"yAxis": "absoluteVisits"

	};
	$scope.areaTotal=0;
	$scope.data_for_chart=[];
	  
	  $http.post("https://msesandbox.cisco.com:8081/api/analytics/v1/deviceCrossover", body, {
       headers: {
        "Content-Type": "application/json"
        },
        transformResponse : function(data){
            return data;
        }

    }).success(function(data, status, headers, config) {
		$scope.rows = JSON.parse(data);
		$scope.data_for_chart = [];
		
		var dataLabel=  {name: 'Proprietary or Undetectable', y: 0.2,dataLabels: {enabled: false }}
		var count=0;
        for(var i=0;i < $scope.rows.results.length;i++){       
			
			var chartData=[];
			$scope.areaTotal=$scope.rows.targets.total;
			$scope.targetinAreas = $scope.rows.results[i].crossoverFromTargetIntoArea;
			$scope.areainTargets = $scope.rows.results[i].crossoverFromAreaIntoTarget;
			var areaPercntageCor =0;
			
			areaPercntageCor =  $scope.targetinAreas*100/$scope.areaTotal;
			targetPercntageCor=  $scope.areainTargets*100/$scope.areaTotal;
			if(areaPercntageCor!=0 && targetPercntageCor!=0 ){
				var targetName = $scope.rows.results[i].area;	
					chartData[0]=targetName;
					chartData[1]=parseInt(areaPercntageCor);
					chartData[2]=parseInt(targetPercntageCor);
					chartData[3]=parseInt($scope.targetinAreas);
					chartData[4]=parseInt($scope.areainTargets);
					chartData[5]=parseInt($scope.areaTotal);
					$scope.data_for_chart[count]=chartData;
					count=count+1;
					//console.log(chartData);
				}
			}
			sessionStorage.setItem("visitrs",$scope.areaTotal)
			sessionStorage.setItem("zone",$scope.rows.targets.areas[0].area);
			//$scope.data_for_chart[$scope.rows.results.length]=dataLabel;
			console.log("#############################################");
			console.log($scope.data_for_chart);
			 Highcharts.chart('container10', {
        chart: {
            plotBackgroundColor: null,
			useHTML: true,
            plotBorderWidth: 0,
            plotShadow: false,
			events: {
                load: function () {
				
				 //this.renderer.text('<g class="crossover-target" width="49.199999999999996" height="49.199999999999996" transform="translate(229.5, 205)"><text class="crossover-target-title" style="text-anchor: middle;"><tspan y="-137.76" fill="#000000" style="font-size: 26px;">Zone3</tspan><tspan y="-118.07999999999998" x="0" fill="#666666" style="font-size: 15px;">Focus Area</tspan></text><ellipse class="crossover-target-ellipse" rx="49.199999999999996" ry="49.199999999999996" fill="#e9e9e9" stroke="#ffffff" stroke-width="5"></ellipse><text class="crossover-target-value" style="text-anchor: middle;"><tspan y="0" fill="#455d75" style="font-size: 22.14px;">21</tspan><tspan y="16.4" x="0" fill="#666666" style="font-size: 12.3px;">Visits</tspan></text></g>').attr({
                      //   zIndex: 101 
                    //}).add(); 
				 //$(".highcharts-root").append('<svg class="crossover-target" z-index= "101" width="49.199999999999996" height="49.199999999999996" transform="translate(229.5, 205)"><text class="crossover-target-title" style="text-anchor: middle;"><tspan y="-137.76" fill="#000000" style="font-size: 26px;">Zone3</tspan><tspan y="-118.07999999999998" x="0" fill="#666666" style="font-size: 15px;">Focus Area</tspan></text><ellipse class="crossover-target-ellipse" rx="49.199999999999996" ry="49.199999999999996" fill="#e9e9e9" stroke="#ffffff" stroke-width="5"></ellipse><text class="crossover-target-value" style="text-anchor: middle;"><tspan y="0" fill="#455d75" style="font-size: 22.14px;">21</tspan><tspan y="16.4" x="0" fill="#666666" style="font-size: 12.3px;">Visits</tspan></text></svg>');
				  $("#svgcontainer").html('<svg width="100" height="100"><circle cx="40" cy="40" r="30" stroke="green" stroke-width="0" fill="#e9e9e9"></circle><text x="27" y="42" fill="black">'+sessionStorage.getItem("visitrs")+' </text><text x="27" y="60" fill="black">visits</text></svg>');
				  $("#textcontainer").html('<svg width="70%" height="25%"><text x="27" y="42" fill="black" style="font-weight: bold">'+sessionStorage.getItem("zone")+' </text><text x="39" y="60" fill="black">  Focus Area</text></svg>');
				}
		    }
        },
        title: {
            text: ''
        },
		tooltip: {
		      useHTML: true,
		      formatter: function() {                     			
                        return '<center><b>'+this.key 
						+ '</b></center><br>There is correlation of <b>' +this.y
						+ '% </b>('+this.series.userOptions.data[this.point.x][3]
						+'/'+this.series.userOptions.data[this.point.x][5]
						+')between devices seen in <b>'+sessionStorage.getItem("zone")+'</b> and <b>'
						+this.key+'</b><br>There is a correlation of <b>'
						+this.series.userOptions.data[this.point.x][2]+'% </b>('
						+this.series.userOptions.data[this.point.x][4]+'/'
						+this.series.userOptions.data[this.point.x][5]
						+')between devices seen in <b>'
						+this.key+'</b> and <b>'+sessionStorage.getItem("zone")+'</b><br><br>Correlation refers to the devices seen in both areas during the time and date selected above';	
						
                    } 
            
        },
        subtitle: {
            text: ''
        },		
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: 10,
					formatter : function(){					
					 return '<b>'+this.series.userOptions.data[this.point.x][1]+'</b>%<br>'+this.key;
					},
                    style: {                        
                        color: 'black'
                    }
                },
                startAngle:20,
                endAngle: 340,
                center: ['50%', '50%']
            }
        },
        series: [{
		    type: 'pie',
            name: 'Delivered amount',
			innerSize: '50%',
            data: $scope.data_for_chart
			
        }],
		credits:{
                enabled: true
            },

            exporting: {
                enabled: false
            }


    });
			
			
    }).error(function(data, status, headers, config) {
       $scope._error = data;
    });
	  
	  
	  
	  
	  
  }
	
};
	
	$scope.getDataforDonut('today',$scope.areacoded);
	
 
	
	

	
	
    });
