var React = require('react'),
    Navbar = require('./navbar.jsx'),
    Quiz = require('./quiz.jsx');

var App = React.createClass({
  componentDidMount: function() {
  },
  render: function () {
    return (
      <div>
        <div className="header">
          <Navbar className="header"/>
        </div>

        <Quiz/>
      </div>
    )
  }
});

module.exports = App;
