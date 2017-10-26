$(document).ready(function(){


$('.navicon').click(function(){

	$('.sidebar-section').addClass('left-side');
});

$('.close-side').click(function(){

$('.sidebar-section').removeClass('left-side');
});


$('.carousel').carousel({
    interval: 1000000
}); 
});




$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "container-heighchart",
            type: 'line'
        },
        title: {
            text: ' '
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

$(function () {

var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'containerfirst',
            type: 'spline'
        },
        title: {
            text: 'YoY Production with Turbine'
        },
        colors: ['#000000', '#41E446'],
        xAxis: {

                tickInterval: 10,
                min:1980,
                max:2020
        },
        yAxis: {
            title: {
                text: 'Diameter of Rotor'
            },
            tickInterval:50
        },
       plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            }
        ,
        series: [{
                type:'spline',
                name: 'John',
                data: [[1985,11.7],[1987,12],[1995,25],[1999,50],[2002,80],[2008,145]]
        },{
            type:'scatter',
            color: 'rgba(119, 152, 191, 0.498039)',
            name: 'Jane',
            data: [[1983,53],[1983,75],[1982,87],[1983.5,43],[1983.4,61],[1984,95],
            [1989, 73.9], [1991, 66.8], [1983.4, 72.3], [1999.3, 88.6],
                [1994, 75.5], [1980, 91.1], [2010, 67.3], [1995, 117.7],
                [1994.5, 76.6], [1983.4, 125.0],
                [1992, 102.5], [1991.5, 97.3],[1986,122],[1987,130],[198.5,42],[1988,160],[1983.4, 101.8], [1989, 87.9], [2000, 94.3],
                [1989, 70.9], [1996, 104.5], 
                [1991, 100.0], [2000, 82.3], [1991, 93.6], [1982, 74.1], [1997, 95.9],
                [1999.7, 73.2],  [1992, 105.9], [2000.5, 90.9], [1989, 89.1],
                [1997, 62.3], [2000, 82.7], [1999, 109.1], [2011, 98.2], [1993, 84.1],
                [1982, 83.2], [1992, 83.2]],
            
            marker:{
                radius:5,
                symbol:"square"
            }
          }, {  
            type:'scatter',
             name: 'mark',
                data: [[1987,09],[1995,31],[1999,56],[2002,85],[2008,150]],
                marker:{
                    symbol:'triangle'
                }
             },
            {
             type:'scatter',
             color: 'rgba(223, 83, 83, 0.498039)',
             name: 'fourth',
             
             data: [ [2005.6, 190], [2004, 167.3], 
                [1994, 145.6], [2003,115],
                [2000, 97.5],[1999, 80.1], [1996.5, 84.1],
                [1992.7, 43.2], [1997, 83.2]],
            marker:{
                radius:6
            }
            }
        ],
    });

});


