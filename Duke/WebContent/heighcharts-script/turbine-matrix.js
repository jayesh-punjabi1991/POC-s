$(function(){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo:'option1',
            type: 'area'
        },
        title: {
            text: 'Area chart with negative values'
        },
        xAxis: {
           
            categories: ['Jan', 'Feb', 'March', 'April', 'May','June','July','Aug']
        },
        yAxis:{
            title: {
                text: 'MWh'
            },
            tickInterval:2,
            min:0,
            max:8
        },
       
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x:-400,
            y:90,
            floating: true,
            
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        series: [{
            name: 'Budget',
            data: [0,1.33,2.67,3.16,6.1,7.1]
        }, {
            name: 'Actual',
            data: [0,1.3, 2.65,2.9]
        }]
    });


 /*data 2 rendered */

       var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'option5',
            type: 'column',
            
        },
        yAxis:{
                title:{
                                text:'Availablity %'
                },
                tickInterval:50,
                min:0,
                max:150,
        },
        xAxis:{
                
                categories:['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
        },
        title: {
            text: 'Availablity (Contractual Time Based,%)'
        },
                
        /*plotOptions: {
            column: {
                depth: 25
            }
        },*/
        series: [{
                name:'Availablity-Target-97.7%--Average 97.1%',
            data: [78, 99, 140, 167, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 148 , 54.4]
        }]
    });





var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-3",
             zoomType: 'x',
        },
         title: {
            text: 'Wind Resource'
        },
        
        colors: ['#9768E2', '#41E446', '#FF905C','#43B5E0','#4D70F1'],
        xAxis: {
         gridLineWidth: 1,
            gridLineDashStyle: 'ShortDot',  
            lineColor: 'black',
            tickInterval:200,
            min:0,
            max:600
        },
       yAxis: {
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDot',
             tickInterval:100,
            min:-100,
            max:300 ,
            title: {
                text: 'Wind Power(MW)'
            }
        },
       
        series: [{
            name: 'Forecast Wind Power',
            data:[[0,99.1],
            [0,99.3],
            [0.1,100],
            [0.5,99.5],
            [1,78],
            [0.9,99.8],
            [1.2,95.7],
            [1.4,99.9],
            [1.7,100],
            [2.2,95.7],
            [2.4,99.9],
            [2.7,100],
            [3.2,95.7],
            [3.4,99.9],
            [3.7,100],
            [4.2,95.7],
            [4.4,99.9],
            [4.7,100],
            [5.1,100.6],
            [12.5,109],
            [12.7,120],
            [13,101],
            [14,120],
            [15,130],
            [15,100],
            [15,189],
            [15.5,199],
            [15.7,299],
            [15.72,298],
            [15.75,298],
            [16.78,298],
            [16.79,298],
            [16.80,298],
            [16.81,298],
            [16.82,298],
            [16.83,298],
            [16.84,298],
            [16.85,298],
            [16.91,199],
            [16.92,169],
            [17.15,135],
            [17.39,101],
            [17.41,120],
            [17.45,134],
            [17.56,77],
            [17.69,108],
            [17.99,49],
            [18.11,65],
            [18.29,79],
            [19.30,69],
            [20.55,199],
            [21,99.1],
            [21.5,99.3],
            [23.1,100],
            [24.5,99.5],
            [24.7,78],
            [24.9,99.8],
            [25.1,95.7],
            [36.1,99.9],
            [36.7,100],
            [37.2,100.6],
            [37.5,109],
            [37.7,120],
            [39,101],
            [40,120],
            [41.9,130],
            [42.1,100],
            [43.1,189],
            [44.2,199],
            [44.5,299],
            [45.6,199],
            [46.7,169],
            [46.8,135],
            [46.9,101],
            [46.99,120],
            [47.1,134],
            [48.6,77],
            [48.7,108],
            [49.1,49],
            [49.5,165],
            [50.1,79],
            [51.1,69],
            [52.1,199],
            [53,101],
            [54,120],
            [55,130],
            [55,100],
            [55,189],
            [55.5,199],
            [55.7,299],
            [55.9,199],
            [56.3,169],
            [56.7,135],
            [56.9,101],
            [57.1,120],
            [57.5,134],
            [57.6,77],
            [57.9,108],
            [57.99,49],
            [58.1,65],
            [58.9,79],
            [59.0,69],
            [60.5,199],
            [61,99.1],
            [61.5,99.3],
            [63.1,100],
            [64.5,99.5],
            [64.7,78],
            [64.9,99.8],
            [65.1,95.7],
            [66.1,99.9],
            [66.7,100],
            [67.2,100.6],
            [67.5,109],
            [67.7,120],
            [69,101],
            [70,120],
            [71.9,130],
            [72.1,100],
            [73.1,189],
            [74.2,199],
            [74.5,299],
            [75.6,199],
            [76.7,169],
            [76.8,135],
            [76.9,101],
            [76.99,120],
            [77.1,134],
            [78.6,77],
            [78.7,108],
            [79.1,49],
            [79.5,165],
            [80.1,79],
            [81.1,69],
            [82.1,199],[100,200],[105,120],[108.7,134],
            [108.7,77],
            [108.7,108],
            [108.7,49],
            [108.7,165],
            [108.7,79],
            [108.7,69],[108,128],[108.6,97],
            [108.7,108],
            [109.1,49],
            [109.5,165],
            [110.1,79],
            [111.1,169],[112,165],[113.6,165],[123,100],[200,256],[250,79],[256,90],[350,250],[389,167],[421,307],[450,120],[467,222],[589,100]]
        },{
            name: 'Actual Wind Power',
            data:[[0,99.1],
            [0,99],
            [0.1,100],
            [0.5,99.5],
            [1,78],
            [0.9,99.8],
            [1.2,95.7],
            [1.4,99.9],
            [1.7,100],
            [2.2,95.7],
            [2.4,99.9],
            [2.7,100],
            [3.2,95.7],
            [3.4,95.7],
            [3.7,95.7],
            [4.2,100],
            [4.4,99.9],
            [4.7,100],
            [5.1,100.6],
            [12.5,109],
            [12.7,120],
            [13,100],
            [14,100],
            [15,130],
            [24.5,99.5],
            [24.7,78],
            [24.9,100],
            [25.1,100],
            [36.1,99.9],
            [36.7,100],
            [37.2,100.6],
            [37.5,109],
            [37.7,100],
            [39,101],
            [40,120],
            [41.9,130],
            [42.1,100],
            [43.1,189],
            [44.2,199],
            [44.5,299],
            [45.6,199],
            [46.7,169],
            [46.8,135],
            [46.9,101],
            [46.99,120],
            [47.1,134],
            [48.6,77],
            [48.7,108],
            [49.1,49],
            [49.5,165],
            [50.1,79],
            [51.1,69],
            [52.1,199],
            [53,101],
            [54,120],
            [55,130],
            [55,100],
            [55,189],
            [55.5,199],
            [55.7,299],
            [55.9,199],
            [56.3,169],
            [56.7,135],
            [56.9,101],
            [57.1,120],
            [57.5,134],
            [57.6,77],
            [57.9,108],
            [57.99,49],
            [58.1,65],
            [58.9,79],
            [59.0,69],
            [60.5,199],
            [61,99.1],
            [61.5,199],
            [63.1,100],
            [64.5,199],
            [64.7,197],
            [64.9,99.8],
            [65.1,95.7],
            [66.1,99.9],
            [66.7,100],
            [67.2,100.6],
            [67.5,109],
            [67.7,120],
            [69,101],
            [70,120],
            [71.9,130],
            [72.1,100],
            [73.1,189],
            [74.2,199],
            [74.5,299],
            [75.6,199],
            [76.7,169],
            [76.8,135],
            [76.9,101],
            [76.99,120],
            [77.1,134],
            [78.6,77],
            [78.7,108],
            [79.1,49],
            [79.5,165],
            [80.1,79],
            [81.1,69],
            [82.1,199],[100,200],[105,120],[108.7,134],
            [108.7,77],
            [108.7,108],
            [108.7,49],
            [108.7,165],
            [108.7,79],
            [108.7,69],[108,128],[108.6,97],
            [108.7,108],
            [109.1,49],
            [109.5,165],
            [110.1,79],
            [111.1,269],[112,199],[113.6,79],[123,165],[200,77],[256,120],[350,250],[389,167],[421,250],[450,120],[467,250],[589,250]]
        }]
    });

var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'option6',
            type: 'column',
            
        },
        yAxis:{
                title:{
                                text:'Lost Production Factor(%)'
                },
                tickInterval:50,
                min:0,
                max:150,
        },
        xAxis:{
                
                categories:['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
        },
        title: {
            text: 'Lost Production Factor(%)'
        },
                
        /*plotOptions: {
            column: {
                depth: 25
            }
        },*/
        series: [{
                name:'Lost Production Factor--Average 2,4%',
            data: [58, 109, 110, 123, 54.6, 76.0, 121.6, 48.5, 76.4, 84.1, 128 ,54.4]
        }]
    });



var chart = new Highcharts.Chart({
            chart: {
                renderTo:'contain1',
                type: 'bar'
            },
            title: {
                text: 'Akersberga,-320MWh/-5.5%'
            },
            
            xAxis: [{
                categories: ['Nacelle Yaw Drives System','Power Consumption Distributor Cabinate-Tower Base','Batteries For Low Voltage Ride-Through System','Generator GearBox(Speed Increaser)','Nacelle Housing,General','Mechanical Brake','Lower Section','Hub Housing'],
               
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                min:0,
                max:8,
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

          
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
      legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
            series: [{
            name: 'Cost',
            data: [1.52, 1.6, 4.21, 3.2, 3.90,3.56,5.6,3.2]
        }, {
            name: 'Downtime %',
            data: [2.12, 3.54, 4.450, 3.40, 3.47,5.4,6.1,5.2]
        },
        
        ]
        });



var chart = new Highcharts.Chart({
            chart: {
                renderTo:'contain2',
                type: 'bar'
            },
            title: {
                text: 'Perstrop,-18MWh/3.0%'
            },
            
            xAxis: [{
                categories: ['Nacelle Yaw Drives System','Power Consumption Distributor Cabinate-Tower Base','Batteries For Low Voltage Ride-Through System','Generator GearBox(Speed Increaser)','Nacelle Housing,General','Mechanical Brake','Lower Section','Hub Housing'],
               
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                min:0,
                max:8,
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

          
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
      legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
            series: [{
            name: 'Cost',
            data: [1.52, 1.6, 4.21, 3.2, 3.90,3.56,5.6,3.2]
        }, {
            name: 'Downtime %',
            data: [2.12, 3.54, 4.450, 3.40, 3.47,5.4,6.1,5.2]
        },
        
        ]
        });



var chart = new Highcharts.Chart({
            chart: {
                renderTo:'contain3',
                type: 'bar'
            },
            title: {
                text: 'Brunnasker,255MWh/-5.1'
            },
            
            xAxis: [{
                categories: ['Nacelle Yaw Drives System','Power Consumption Distributor Cabinate-Tower Base','Batteries For Low Voltage Ride-Through System','Generator GearBox(Speed Increaser)','Nacelle Housing,General','Mechanical Brake','Lower Section','Hub Housing'],
               
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                min:0,
                max:8,
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

          
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
      legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
            series: [{
            name: 'Cost',
            data: [1.52, 1.6, 4.21, 3.2, 3.90,3.56,5.6,3.2]
        }, {
            name: 'Downtime %',
            data: [2.12, 3.54, 4.450, 3.40, 3.47,5.4,6.1,5.2]
        },
        
        ]
        });


var chart = new Highcharts.Chart({
            chart: {
                renderTo:'contain4',
                type: 'bar'
            },
            title: {
                text: 'Skogsbyn, -119MWh/-4.6%'
            },
            
            xAxis: [{
                categories: ['Nacelle Yaw Drives System','Power Consumption Distributor Cabinate-Tower Base','Batteries For Low Voltage Ride-Through System','Generator GearBox(Speed Increaser)','Nacelle Housing,General','Mechanical Brake','Lower Section','Hub Housing'],
               
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                min:0,
                max:8,
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

          
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
      legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
            series: [{
            name: 'Cost',
            data: [1.52, 1.6, 4.21, 3.2, 3.90,3.56,5.6,3.2]
        }, {
            name: 'Downtime %',
            data: [2.12, 3.54, 4.450, 3.40, 3.47,5.4,6.1,5.2]
        },
        
        ]
        });




   var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart11',
            type: 'column',
            
        },
        colors:['#ce6f6f','#eca4a4','#3ee1c4','#49e5ca','#ce6f6f','#eca4a4','#3ee1c4','#3ee1c4','#ce6f6f','#eca4a4','#3ee1c4'],
        yAxis:{
                title:{
             text:'Availablity %'
                },
                tickInterval:50,
                min:0,
                max:150,
        },
        xAxis:{
                
                categories:['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
        },
        title: {
            text: 'Turbine Performance Metrics'
        },                                                                                  
                
       
           
        series: [{
                colorByPoint: true,
                name:"Actual",
            data: [78, 99, 140, 167, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 148 , 54.4]
        }]
    });





/*
function end */
 });
  





