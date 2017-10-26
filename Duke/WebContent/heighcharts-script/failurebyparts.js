


$(function () {


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "container-heighchart",
            type: 'line'
        },
        title: {
            text: 'Failure By Parts'
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


});




