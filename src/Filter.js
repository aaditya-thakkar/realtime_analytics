var ReactDOM = require('react-dom');
var React = require('react');
var Select = require('react-select');
var countryList = require('./country-list.json')
var element;   // button for applying filter
var Filter = React.createClass({
  getInitialState: function() {
    return({
      options: countryList
    });
  },

  logChange: function(selectedValues) {
    var self=this;
    element.onclick = function() {
      self.props.updateFilter(selectedValues);
    };
  },

  componentDidMount: function() {
    var self=this;
    element = document.createElement("input");
    element.type = "button";
    element.value = "Apply"
    element.name = "button";
    var foo = document.getElementById("btn");
    foo.appendChild(element);
  },

  render: function() {
    var temp;
    return(
      <Select
      name="form-field-name"
      multi= {true}
      options={this.state.options}
      onChange={this.logChange}
      />
    );
  }
});

module.exports = Filter;
