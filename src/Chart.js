var ReactDOM = require('react-dom');
var React = require('react');
var Chartjs = require('chart.js');
var LineChart = require("react-chartjs").Bar;
var Filter =require("./Filter")
var Chart = React.createClass({
  getInitialState: function() {
    return ({
      data : {
        labels: ["Ablania", "002", "003", "004", "005", "006", "007"],
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

  getRandomNumber: function(){
    return Math.floor((Math.random() * 100) + 1);
  },

  onFilterUpdate: function(val) {
    var tempData=this.state.data;
    console.log(val);
    var updatedLabels = val.split(",",500)
    tempData.labels = updatedLabels;
    var updatedData = [];
    for (var i = 0;i < updatedLabels.length; i++){
      updatedData[i] = updatedLabels[i].length;
    }
    tempData.datasets[0].data = updatedData;
    this.setState({
      data:tempData
    });
  },

  componentDidMount: function(){

  },

  render: function() {
    return(<div>
      <Filter updateFilter={this.onFilterUpdate} />
      <LineChart data={this.state.data} options={this.state.options} width="600" height="250" />
      </div>
    );
  }
});

module.exports = Chart;
