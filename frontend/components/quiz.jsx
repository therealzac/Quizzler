var React = require('react');

var Quiz = React.createClass({
  getInitialState: function () {
    return { startButtonClass: "start-button", quizClass: "hidden" };
  },
  handleClick: function () {
    this.setState({ startButtonClass: "hidden", quizClass: "quiz" });
  },
  render: function () {
    return (
      <div>
        <div className={this.state.startButtonClass}>
          <img onClick={this.handleClick} src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsqoVToJaalEM8Uq1E-P5AolKGr5NmPx1tuzUs-Nw4CNL0K0Vf"/>
        </div>

        <div className={this.state.quizClass}>
          this.state.questions.map(function (question) {
          });


        </div>
      </div>
    )
  }
});

module.exports = Quiz;
