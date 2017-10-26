   smartcity.controller('AssetHealthCtrl', function ($scope, $filter,$http ) {
     

var count = 0;
    $(document).ready(function () {
    $("#menu-toggle").click(function(e) {
       e.preventDefault();
         
        $("#wrapper").toggleClass("active");
         count++;
         if(count % 2==0)
         {
         }
         else
         {
         }
    })
  })
     /*To change the highlighter*/
 $('.Submenu li').removeClass("active");
 $('#liCamHealth').addClass("active");
     
$(function() {
  $(document).ready(function() {

Highcharts.theme = {
   colors: ['#8e4fc8', '#38CBFF','#5B91FF', '#4A7CDE', '#6C5EBF', '#4AA9DE', '#F89C1C',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2D3345'],
            [1, '#2D3345']
         ]
      },
      style: {
         fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'
 
         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },
 
   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },
 
   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },
 
   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },
 
   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },
 
   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },
 
   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};
 
// Apply the theme
Highcharts.setOptions(Highcharts.theme);


    //Font of Highcharts
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


    //Font of Highcharts
    Highcharts.setOptions({
            global: {
                useUTC: false
            },
            chart: {
            style: {
            fontFamily: 'Roboto-Regular',
            fontWeight:'normal'
           
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