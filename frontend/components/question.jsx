var React = require('react');

var Question = React.createClass({
  getInitialState: function() {
    return({
      answerChoice: "";
    })
  },
  showAnswerBody: function() {
    if (this.props.question.type === "multiple choice") {
      return multipleChoiceAnswerBody();
    } else if (this.props.question.type === "true false") {
      return trueFalseAnswerBody();
    } else if (this.props.question.type === "fill in the blank") {
      return fillInTheBlankAnswerBody();
    }
  },
  multipleChoiceAnswerBody: function() {
    return (
      this.props.question.answers.map(function(answer) {
        return (
          <input
            className="multiple-choice-answer"
            onClick={this.updateAnswerChoice}
            name={this.props.question.id}
            type="radio"
            value={answer.text}>
            {answer.text}
        )
      }.bind(this))
    );
  },
  trueFalseAnswerBody: function() {
    return (
      <input
        className="true-false-answer"
        onClick={this.updateAnswerChoice}
        name={this.props.question.id}
        type="radio"
        value="true">
        True
      <input
        className="true-false-answer"
        onClick={this.updateAnswerChoice}
        name={this.props.question.id}
        type="radio"
        value="false">
        False
    );
  },
  fillInTheBlankAnswerBody: function() {
    return (
      <input
        className="fill-in-the-blank-answer"
        onClick={this.updateAnswerChoice}
        type="text"
        onChange={this.updateAnswerChoice}>
        {this.state.answerChoice}
      </input>
    );
  },
  updateAnswerChoice: function(e) {
    this.setState({answerChoice: e.target.value});
  }
  submitAnswer: function(e) {
    e.preventDefault();
    ApiUtil.submitAnswer(this.props.question.id, this.state.answerChoice);
  },

  render: function() {
    return(
      <div className="question">
        <div className="question-text">
          {this.props.question.text}
        </div>
        <div className="answer-body">
          {this.showAnswerBody()}
          <button
            className="submit-answer-button"
            onClick={this.submitAnswer}>
            Submit
          </button>
        </div>
      </div>
    )
  }
});

module.exports = Question;
