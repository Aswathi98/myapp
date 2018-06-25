var os = require('os');
SysMon = new Mongo.Collection('sysmon');

function buildLineChart(){
   
   Highcharts.setOptions({          
                global : {
                    useUTC : false
                }
            }); 
  
   return new Highcharts.Chart({
    chart: {
        renderTo: 'lineChart1',
        type: 'spline'
    },
    title: {
        text: 'Cpu Load Average Chart'
    },
   
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            //month: '%e. %b',
            //year: '%b'
	    //hour: '%H:%M',
	    second: '%H:%M:%S',
        },
        title: {
            text: 'Timestamp'
        }
    },
    yAxis: {
        title: {
            text: 'Load Avg'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        //pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        pointFormat: '{point.x:%H:%M}: {point.y:.2f}'
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
    },
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    series: [{
        name: "CPU 1 min load average",
        data: []
    }]
});
}
function buildLineChart2(){
 Highcharts.setOptions({          
                global : {
                    useUTC : false
                }
            }); 
  
   return new Highcharts.Chart({
    chart: {
        renderTo: 'lineChart2',
        type: 'spline'
    },
    title: {
        text: 'Cpu Load Average Chart'
    },
   
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            //month: '%e. %b',
            //year: '%b'
	    //hour: '%H:%M',
	    second: '%H:%M:%S',
        },
        title: {
            text: 'Timestamp'
        }
    },
    yAxis: {
        title: {
            text: 'Load Avg'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        //pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        pointFormat: '{point.x:%H:%M}: {point.y:.2f}'
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
    },
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    series: [{
        name: "CPU 5 min load average",
        data: []
    }]
});
}
function buildLineChart3(){
 Highcharts.setOptions({          
                global : {
                    useUTC : false
                }
            }); 
  
   return new Highcharts.Chart({
    chart: {
        renderTo: 'lineChart3',
        type: 'spline'
    },
    title: {
        text: 'Cpu Load Average Chart'
    },
   
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            //month: '%e. %b',
            //year: '%b'
	    //hour: '%H:%M',
	    second: '%H:%M:%S',
        },
        title: {
            text: 'Timestamp'
        }
    },
    yAxis: {
        title: {
            text: 'Load Avg'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        //pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        pointFormat: '{point.x:%H:%M}: {point.y:.2f}'
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
    },
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    series: [{
        name: "CPU 15 min load average",
        data: []
    }]
});
}


if (Meteor.isServer) {
  SyncedCron.add({
  name: 'Store System 1 min Load Avg in mongo db',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 1 min');
   },
  job: function() {
    console.log(os.loadavg());
    SysMon.insert({'timestamp':new Date().getTime(),'cpu_1_min':os.loadavg()[0]});
   }
  });
  SyncedCron.add({
  name: 'Store System 5 min Load Avg in mongo db',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 5 min');
   },
  job: function() {
    console.log(os.loadavg());
    SysMon.insert({'timestamp':new Date().getTime(),'cpu_5_min':os.loadavg()[1]});
   }
  });
  SyncedCron.add({
  name: 'Store System 15 min Load Avg in mongo db',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 15 min');
   },
  job: function() {
    console.log(os.loadavg());
    SysMon.insert({'timestamp':new Date().getTime(),'cpu_15_min':os.loadavg()[2]});
   }
  });

  SyncedCron.start();
}

if(Meteor.isClient){
    /*Template.home.rendered = function () {
        var chart = buildPie();
        this.autorun(function () {
            chart.series[0].setData(SysMon.find({}).fetch());
        });
    };*/
    Template.line1.rendered = function () {
        var chart = buildLineChart();
        this.autorun(function () {
	    //var maxData=60;
	    var loadData = SysMon.find({}, { fields: { cpu_5_min:0, cpu_15_min:0}, sort:{timestamp:1},limit:60 }).fetch();
	    var arrayLength = loadData.length;
	    var myData=[];
            for (var i = 0; i < arrayLength; i++) {
	      //if (i > maxData)
	      //break;
	      var dataElement = []
	      dataElement.push(loadData[i].timestamp);
	      if(loadData[i].cpu_1_min){
	       dataElement.push(loadData[i].cpu_1_min);
	       myData.push(dataElement);
	      }
            }
            chart.series[0].setData(myData);
        });
    };
Template.line2.rendered = function () {
        var chart = buildLineChart2();
        this.autorun(function () {
	    //var maxData=60;
	    var loadData = SysMon.find({}, { fields: { cpu_1_min:0, cpu_15_min:0}, sort:{timestamp:1},limit:60 }).fetch();
	    var arrayLength = loadData.length;
	    var myData=[];
            for (var i = 0; i < arrayLength; i++) {
	      //if (i > maxData)
	      //break;
	      var dataElement = []
	      dataElement.push(loadData[i].timestamp);
	      if(loadData[i].cpu_5_min){
	       dataElement.push(loadData[i].cpu_5_min);
	       myData.push(dataElement);
	      }
            }
            chart.series[0].setData(myData);
        });
    };
Template.line3.rendered = function () {
        var chart = buildLineChart3();
        this.autorun(function () {
	    //var maxData=60;
	    var loadData = SysMon.find({}, { fields: { cpu_1_min:0, cpu_5_min:0}, sort:{timestamp:1},limit:60 }).fetch();
	    var arrayLength = loadData.length;
	    var myData=[];
            for (var i = 0; i < arrayLength; i++) {
	      //if (i > maxData)
	      //break;
	      var dataElement = []
	      dataElement.push(loadData[i].timestamp);
	      if(loadData[i].cpu_15_min){
	       dataElement.push(loadData[i].cpu_15_min);
	       myData.push(dataElement);
	      }
            }
            chart.series[0].setData(myData);
        });
    };
}
