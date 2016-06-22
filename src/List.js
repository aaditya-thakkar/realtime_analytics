var ReactDOM = require('react-dom');
var React = require('react');

var List = React.createClass({
  getInitialState: function() {
    return ({
      list: [1,2,3,4,5,6,7,8,9,10]
    });
  },

  addOrRemove: function(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
    return array;
  },

  componentDidMount: function() {
    var self=this;
    for(var i = 0; i<10; i++){
      setTimeout(function(){
        var updatedList = self.state.list;
        var aftertoggle = self.addOrRemove(updatedList, 5);
        console.log(aftertoggle);
        self.setState({
          list: aftertoggle
        });
      },3000*i);
    }
  },

  render: function() {
    return(
      <div>
      {this.state.list.map(function(item, i){
        return (
          <p key={i}>{item}</p>
        );
      })}
      </div>
    );
  }
});

module.exports = List;
