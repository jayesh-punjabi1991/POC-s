$(function () {


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "main1chart",
            type: 'line'
        },
        title: {
            text: 'Distribution of DownTime by failure Classes and weather'
        },
        colors: ['#9768E2', '#41E446', '#FF905C','#43B5E0','#4D70F1'],
        xAxis: {
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDot',  
            lineColor: 'black'
           
        },
       yAxis: {
            /*type: 'logarithmic',*/
            floor: -10,
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDot',
            ceiling: 100,
            title: {
                text: 'Cumulative Failure rate'
            }
        },
        plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
        series: [{
            name: '1 Line',
            data: [ [0,0],[85,50]]
            
        }, {
            name: 'Expon(1 Line)',
            data: [[0,0],[10,17],[15,25],[17.5,26],[20,27],[60,65]]
        },
        {
            name: 'Beta Line -0 Intercept',
            data: [[0,0],[60,78]]
        },{
            name: '1.5 line',
            data: [[0,0],[45,40],[60,65]]
        },
         {
            type: 'scatter',
            name: 'Cumulative Failure rate',
            data: [[6,-5],[10,0],[11,1],[12,2],[13,3],[20,25],[22,26],[26,30],[30,27],[36,30],[40,35]],
            marker: {
                radius: 4
            }
        }],
    });



      var chart = new Highcharts.Chart({
        chart: {
            renderTo:'mainchart2',
            type: 'column'
        },
        title: {
            text: 'Downtime and Failures by Season and Maintenance Type'
        },
        xAxis: {
            categories: ['Failure', 'Downtime','Failure', 'Downtime']
        },
        yAxis: {
            min: 0,
            max:70,
            title: {
                text: 'Total Downtime'
            },
            tickInterval:10,
           stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Fall',
            data: [4.39, 6.5, 10.7, 7.5]
        }, {
            name: 'Spring',
            data: [9.6, 5.2,7.8,6.35]
        }, {
            name: 'Summer',
            data: [7.52, 7.85, 5.78, 4.2]
        },{
            name: 'Winter',
            data: [12.28, 2.1, 3.45, 10.3]
        }]
    });



var chart = new Highcharts.Chart({
            chart: {
                renderTo:'mainchart3',
                type: 'bar'
            },
            title: {
                text: 'Downtime And Failure Rate of Failure Classes of Turbine'
            },
            
            xAxis: [{
                categories: ['Electrical System','Electrical Control','Hydraulic System','Yaw System','Rotor Hub','Mechanical Brake','Rotor Blades','Gear Box'],
               
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                min:-2,
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

            series: [{
            name: 'WMEP Failure Rate',
            data: [3, 1.6, 4.7, 4.8, 6.0]
        }, {
            name: 'LWK Downtime',
            data: [1.52, 9.54, 4.250, 7.40, 3.8]
        },
        {
            name: 'LWK Failure Rate',
            data: [-1, -0.3, -1.2, -1.32, -1.6]
        },  {
            name: 'WMEP Downtime',
            data: [-1.2, -1.6, -0.50, -0.80, -0.55]
        }
        ]
        });


var chart = new Highcharts.Chart({
        chart:{
             renderTo:'mainchart4'
        },
        title: {
           
            text: 'Downtime and Failures by Season and Maintenance Type'
        },
        xAxis: {
           
            categories: [' 2011', ' 2012', ' 2013', '2014', '2015']
        },
        labels: {
            items: [{
                
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        yAxis: [{
        labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                tickInterval:10,
                min:0,
                max:40,
                text: 'Percentage(%)'
            }
        }, {
            title: {
                text: 'Cost',

            },
             
                min:-1,
                max:3,
            gridLineWidth: 0,
            opposite: true
        }],
        series: [{
            type: 'column',
            name: 'CM',
            data: [13, 22, 11, 33, 4]
        }, {
            type: 'column',
            name: 'OP',
            data: [12.4, 3, 25, 7, 16]
        }, {
            type: 'column',
            name: 'PM',
            data: [4, 15, 3.8,19, 9]
        },
        {
            type: 'column',
            name: 'SAPM',
            data: [4, 11.7, 3, 29, 5.6]
        }, {
            type: 'spline',
            name: 'SA',
            yAxis:1,
            data: [-0.5, 3.67, 0.3, 0.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        },
        ]
    });




var chart = new Highcharts.Chart({
        chart:{
             renderTo:'mainchart5'
        },
        title: {
           
            text: 'Downtime and Failures by Season and Maintenance Type'
        },
        xAxis: {
           
            categories: [' 2011', ' 2012', ' 2013', '2014', '2015']
        },
        labels: {
            items: [{
                
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        yAxis: [{
        labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                tickInterval:10,
                min:0,
                max:40,
                text: 'Percentage(%)'
            }
        }, {
            title: {
                text: 'Cost',

            },
             
                min:-1,
                max:3,
            gridLineWidth: 0,
            opposite: true
        }],
        series: [{
            type: 'column',
            name: 'CM',
            data: [13, 22, 11, 33, 4]
        }, {
            type: 'column',
            name: 'OP',
            data: [12.4, 3, 25, 7, 16]
        }, {
            type: 'column',
            name: 'PM',
            data: [4, 15, 3.8,19, 9]
        },
        {
            type: 'column',
            name: 'SAPM',
            data: [4, 11.7, 3, 29, 5.6]
        }, {
            type: 'spline',
            name: 'SA',
            yAxis:1,
            data: [-0.5, 3.67, 0.3, 0.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        },
        ]
    });





});
