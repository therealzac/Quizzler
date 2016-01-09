var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <div className="navbar">
        <ul>
          <li className="logo">App Academy Quizzler</li>
          <li className="quiz-name">Ruby quiz</li>
          <li className="header-right">4/5 questions answered</li>
          <li className="header-right">Time remaining: 1:00</li>
        </ul>
      </div>
    )
  }
});

module.exports = Navbar;
