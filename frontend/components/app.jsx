var React = require('react'),
    Navbar = require('./navbar.jsx'),
    StartButton = require('./startButton.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <div className="header">
          <Navbar className="header"/>
        </div>

        <StartButton/>
      </div>
    )
  }
});

module.exports = App;
