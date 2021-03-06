var React = require('react');
var QuestionResultStore = require('../stores/questionResultStore');
var ApiUtil = require('../apiUtil/apiUtil.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Question = React.createClass({
  getInitialState: function() {
    return({
      answerChoice: "",
      answerText: "",
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
      this.revealAnswer(questionResult);
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
            </input>
            <label htmlFor={answer.id}> {answer.text}</label>
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
            </input>
            <label htmlFor={answer.id}> {answer.text}</label>
          </div>
        )
      })
    )
  },
  fillInTheBlankAnswerBody: function() {
    return (
      <div>
        <input
          id={"fill-in-the-blank-answer" + this.props.question.id}
          className="fill-in-the-blank-answer"
          onClick={this.updateAnswerText}
          type="text"
          onChange={this.updateAnswerText}>
        </input>
      </div>
    );
  },
  updateAnswerChoice: function(e) {
    this.setState({answerChoice: e.target.value});
  },
  updateAnswerText: function(e) {
    this.setState({answerText: e.target.value});
  },
  submitAnswer: function(e) {
    e.preventDefault();

    // var answerId = null;
    // var answerText = null;

    // if (typeof this.state.answerChoice === "string") {
    //   answerText = this.state.answerChoice;
    // } else if (typeof this.state.answerChoice === "number") {
    //   answerId = this.state.answerChoice;
    // }

    var answerParams = {
      user_id: 1,
      answer_id: this.state.answerChoice,
      answer_text: this.state.answerText
    }

    ApiUtil.submitAnswer(answerParams, this.props.question.id, this.revealAnswer);
  },
  revealAnswer: function (result) {
    this.setState({questionResult: result})

    if (document.getElementById(result.selected_answer_id)) {
      document.getElementById(result.selected_answer_id).checked = true;
    }

    for (var i = 0; i < result.answers.length; i++) {
      if (this.props.question.question_type === "fill in the blank") {
        document.getElementById("fill-in-the-blank-answer" + this.props.question.id).disabled = true;
      } else {
        document.getElementById(result.answers[i].id).disabled = true;
      }
    }

  },
  buttonOrResult: function () {
    if (!this.state.questionResult) {
      return (
        <button
          className="submit-button"
          onClick={this.submitAnswer}>
          Submit
        </button>
      )
    } else {
      if (this.state.questionResult.is_correct) {
        return (
          <ReactCSSTransitionGroup transitionName="reveal-answer"
                                   transitionAppear={true}
                                   transitionAppearTimeout={0}
                                   transitionEnterTimeout={0}
                                   transitionLeaveTimeout={0}>
            <div key={this.state.questionResult.correct_answer_id}>
              <span className="correct">Correct!</span><br/><br/>
              <span className="explanation">{this.state.questionResult.explanation}</span>
            </div>
          </ReactCSSTransitionGroup>
        )
      } else {
        return (
          <ReactCSSTransitionGroup transitionName="reveal-answer"
                                   transitionAppear={true}
                                   transitionAppearTimeout={0}
                                   transitionEnterTimeout={0}
                                   transitionLeaveTimeout={0}>
            <div key={this.state.questionResult.correct_answer_id}>
              <span className="incorrect">Incorrect!</span><br/><br/>
              Correct answer: {this.state.questionResult.correct_answer.text}<br/>
              <span className="explanation">{this.state.questionResult.explanation}</span>
            </div>
          </ReactCSSTransitionGroup>
        )
      }
    }
  },
  render: function() {
    return (
      <div className="question">
        <div className="question-text">
          <b>{this.props.number}.</b> {this.props.question.text}
        </div>
        <br/>
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
