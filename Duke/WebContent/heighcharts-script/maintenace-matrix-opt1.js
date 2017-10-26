$(function () {


        var chart = new Highcharts.Chart({
        chart:{
             renderTo:'container-heighchart-1'
        },
        title: {
           
            text: 'Failure and Cost Breakup by Year'
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
            data: [-0.5, 2.67, 0.3, 0.33, 3.33],
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
             renderTo:'container-heighchart-2'
        },
        title: {
           
            text: 'Cost Saving % Breakup by Year'
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
                text: 'Cost Savings in(%)'
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
            data: [13, 22, 25, 33, 16]
        }, {
            type: 'column',
            name: 'OP',
            data: [10, 3, 11, 7, 4]
        }, 
        ]
    });

    
       var chart = new Highcharts.Chart({
            chart: {
                renderTo:'container-heighchart-3',
                type: 'bar'
            },
            title: {
                text: 'Top 10 Assests- Maintenance Cost And Downtime'
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






});
