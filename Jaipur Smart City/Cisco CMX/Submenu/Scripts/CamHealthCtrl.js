
   cisco.controller('CamHealthCtrl', function ($scope, $filter,$http ) {
    
     // Adding for default selection -- Praveen
     $('#MenuBar1 a').removeClass("activemenu");
     $('#liCamHealth a').addClass("activemenu");
     // End
     
$(function() {
  $(document).ready(function() {


  Highcharts.setOptions({
      global: {
        useUTC: false
      },
        chart: {
            style: {
              fontWeight:'bold',
            fontSize:'15px'
           
            }
         }
    });


    //Cam Health and Activity Live Monitoring
    $('#container').highcharts({
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function() {
            // set up the updating of the chart each second
            var series = this.series;
            var length = series.length;
            setInterval(function() {
              var myArray =  [0,1,1,1,1,1,1,1];
              var myArray1 = [0,1,1,0,1,1,0,0];  
              var myArray2 = [1,1,1,1,1,1,0,0]; 
              var myArray3 = [0,1,1,0,0,1,0,0];  
              var locations =['WoodlandPark-02','CrystalCourt-01','DwarakadasPark-02','MahilaHospital-04','GroundFloorExit_JDA-05'];
              var x = (new Date()).getTime(),
              y=myArray[Math.floor(Math.random() * myArray.length)], // current time
              y1=myArray1[Math.floor(Math.random() * myArray1.length)],
              y2=myArray2[Math.floor(Math.random() * myArray2.length)],  
              y3=myArray3[Math.floor(Math.random() * myArray3.length)],
              z=locations[Math.floor(Math.random() * locations.length)];        
              series[0].addPoint([x, y],true,true);
              series[1].addPoint([x, y1], true, true);           
            }, 1000);
          }
        },
       
      },
      title: {
        text: ''
      },
      legend: {
        enabled: true,
      itemStyle: {
                color: '#000000',                 
                 fontSize: '15px'
              }
    },
    
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
         labels: {
                style: {
                    fontSize:'13px'
                }
            }
      },
      yAxis: {
        title: {
          text: 'Status'
        },
        labels: {
                style: {
                    fontSize:'13px'
                }
            },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function() {
            if(this.y==1){
          return '<b> Start ' + this.series.name + '</b><br/>' 
       }
        else if(this.y==0){
          return '<b> Stop ' + this.series.name + '</b><br/>' 
       }
        }
      },
      exporting: {
        enabled: false
      },
       credits: {
            enabled: false
             },
      series: [{
        name: 'Live Streaming',
        data: (function() {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;
            var myArray = [0,1,1,1,1,1,1,1]; 
            
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y:myArray[Math.floor(Math.random() * myArray.length)]
          
            });
          }
          return data;
        }())
      }, {
        name: 'Recorded Streaming',
         visible: false,
        data: (function() {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;
           var myArray1 = [0,1,1,0,1,1,0,0];   
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
               y:myArray1[Math.floor(Math.random() * myArray1.length)]
            });
          }
          return data;
        }())
      }]
    });
  }); 
     });

});


