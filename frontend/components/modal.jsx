var React = require('react');

var Modal = React.createClass({
  getScore: function() {
    var questionKeys = Object.keys(this.props.questionResults);
    var numberOfCorrectAnswers = 0;
    questionKeys.forEach(function(questionKey) {
      if (this.props.questionResults[questionKey].isCorrect) {
        numberOfCorrectAnswers += 1;
      }
    });
    var numberOfQuestions = questionKeys.length;

    return (
      {"" + numberOfCorrectAnswers + " / " + numberOfQuestions}
    )
  },
  render: function() {
    <div >
      <div className="modal-screen">

      </div>
      <div className="modal-content">
        Quiz Completed! You scored {this.getScore()}.
        Please click "OK" to go back and review your answers.
        <button
          className="close-modal"
          onClick={this.props.closeModal}>
          OK
        </button>
      </div>
    </div>
  }
})
