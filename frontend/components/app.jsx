var React = require('react'),
    Navbar = require('./navbar.jsx'),
    Quiz = require('./quiz.jsx'),
    ApiUtil = require('../apiUtil/apiUtil.js');

var App = React.createClass({
  componentDidMount: function() {
    ApiUtil.fetchQuiz(1);
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
