var React = require('react');
var QuestionResultStore = require('../stores/QuestionResultStore');

var Question = React.createClass({
  getInitialState: function() {
    return({
      answerChoice: "",
      questionResult: null
    })
  },
  componentDidMount: function() {
    this.questionResultStoreListener = QuestionResultStore.addListnener(this._onChange);
  },
  componentWillUnmount: function() {
    this.questionResultStoreListener.remove();
  },
  _onChange: function() {
    questionResult = QuestionResultStore.all()[this.props.question.id];
    if (questionResult) {
      this.setState({
        questionResult: questionResult
      })
    };
  },
  showAnswerBody: function() {
    if (this.props.question.type === "multiple choice") {
      return this.multipleChoiceAnswerBody();
    } else if (this.props.question.type === "true false") {
      return this.trueFalseAnswerBody();
    } else if (this.props.question.type === "fill in the blank") {
      return this.fillInTheBlankAnswerBody();
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
  },

  submitAnswer: function(e) {
    e.preventDefault();
    ApiUtil.submitAnswer(this.props.question.id, this.state.answerChoice);
  },

  buttonOrResult: function () {
    if (!this.state.questionResult) {
      return (
      <button
        className="submit-answer-button"
        onClick={this.submitAnswer}>
        Submit
      </button>
    )} else {
      return (
        <div>
          {this.state.questionResult.correctAnswer}
          {this.state.questionResult.explanation}
        </div>
      )
    }
  }

  render: function() {
    return(
      <div className="question">
        <div className="question-text">
          {this.props.question.text}
        </div>
        <div className="answer-body">
          {this.showAnswerBody()}
          {this.buttonOrResult()}
        </div>
      </div>
    )
  }
});

module.exports = Question;
