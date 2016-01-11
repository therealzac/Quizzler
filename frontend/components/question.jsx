var React = require('react');
var QuestionResultStore = require('../stores/questionResultStore');
var ApiUtil = require('../apiUtil/apiUtil.js');

var Question = React.createClass({
  getInitialState: function() {
    return({
      answerChoice: "",
      questionResult: null
    })
  },
  componentDidMount: function() {
    this.questionResultStoreListener = QuestionResultStore.addListener(this._onChange);
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
    if (this.props.question.question_type === "multiple choice") {
      return this.multipleChoiceAnswerBody();
    } else if (this.props.question.question_type === "true false") {
      return this.trueFalseAnswerBody();
    } else if (this.props.question.question_type === "fill in the blank") {
      return this.fillInTheBlankAnswerBody();
    }
  },
  multipleChoiceAnswerBody: function() {
    var that = this;
    return (
      that.props.question.answers.map(function(answer, idx) {
        return (
          <div key={idx}>
            <input
              id={answer.id}
              className="multiple-choice-answer"
              onClick={that.updateAnswerChoice}
              name={that.props.question.id}
              type="radio"
              value={answer.id}>
              {answer.text}
            </input><br/>
          </div>
        )
      })
    )
  },
  trueFalseAnswerBody: function() {
    var that = this;
    return (
      that.props.question.answers.map(function(answer, idx) {
        return (
          <div key={idx}>
            <input
              id={answer.id}
              className="multiple-choice-answer"
              onClick={that.updateAnswerChoice}
              name={that.props.question.id}
              type="radio"
              value={answer.id}>
              {answer.text}
            </input><br/>
          </div>
        )
      })
    )
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

    var answerParams = {
      user_id: 1,
      answer_id: this.state.answerChoice
    }

    ApiUtil.submitAnswer(answerParams, this.revealAnswer);
  },
  revealAnswer: function (result) {
    this.setState({questionResult: result})
    for (var i = 0; i < result.answers.length; i++) {
      document.getElementById(result.answers[i].id).disabled = true;
    }
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
          {this.state.questionResult.is_correct ? "Correct!" : "Wrong!"}<br/>
          The correct answer was: {this.state.questionResult.correct_answer.text}<br/>
          Explanation: {this.state.questionResult.explanation}
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="question">
        <div className="question-text">
          {this.props.question.text}
        </div>
        <div className="answer-body">
          {this.showAnswerBody()}
          <br/>
          {this.buttonOrResult()}
        </div>
        <br/><br/>
      </div>
    )
  }
});

module.exports = Question;
