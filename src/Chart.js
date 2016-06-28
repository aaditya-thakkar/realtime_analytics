var ReactDOM = require('react-dom');
var React = require('react');
var Chartjs = require('chart.js');
var LineChart = require("react-chartjs").Bar;
var Filter = require("./Filter");
var countryCode = require("./country-code.json");
var helper = require("./helper");
var countryArray = [];
var codeArray = [];
var appbaseRef = helper.createAppbaseRef();

for(var i=0; i<countryCode.length; i++){
  countryArray[countryCode[i].code.toLowerCase()] = countryCode[i].name;
  codeArray[countryCode[i].name] = countryCode[i].code.toLowerCase();
}
var Chart = React.createClass({
  getInitialState: function() {
    return ({
      data : {
        labels: ["001", "002", "003", "004", "005", "006", "007"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,0,0,0.5)",
            strokeColor: "rgba(220,0,0,0.8)",
            highlightFill: "rgba(220,0,220,0.75)",
            highlightStroke: "rgba(220,0,220,1)",
            data: [20, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  },

  callStaticUpdates: function(tempData, requestObject) {
    var resultArr = [];
    var self = this;
    appbaseRef.search(requestObject).on('data', function(stream) {
      console.log(stream);
      stream.aggregations.filtered.country_count.buckets.map(function(bucket, index){
        var indexOfCountry = tempData.labels.indexOf(countryArray[bucket.key]);
        tempData.datasets[0].data[indexOfCountry] = bucket.doc_count;
      });
      self.setState({
        data:tempData
      });
    }).on('error', function(error) {
      console.log(error);
    });
  },

  onFilterUpdate: function(val) {
    var countryArr = [];
    var tempData=this.state.data;
    var updatedLabels = val.split(",",500)
    for(var i=0;i<updatedLabels.length;i++){
      console.log(updatedLabels[i]);
      countryArr.push(codeArray[updatedLabels[i]]);
    }
    console.log(countryArr);
    tempData.labels = updatedLabels;
    var updatedData = [];
    for (var i = 0;i < updatedLabels.length; i++){
      updatedData[i] = 0;
    }
    var requestObject = helper.createRequestObject(countryArr);
    tempData.datasets[0].data = updatedData;
    this.callStaticUpdates(tempData, requestObject);
  },

  render: function() {
    return(<div>
      <Filter updateFilter={this.onFilterUpdate} />
      <LineChart data={this.state.data} options={this.state.options} width="800" height="350" />
      </div>
    );
  }
});

module.exports = Chart;
