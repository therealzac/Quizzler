var React = require('react');
var QuizStore = require('../stores/quizStore');
var QuestionResultStore = require('../stores/questionResultStore');
var Question = require('./question.jsx');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      startButtonClass: "start-button",
      quizOpen: false,
      quiz: QuizStore.quiz(),
      questionResults: {}
     };
  },
  handleClick: function () {
    this.setState({ startButtonClass: "hidden", quizOpen: true });
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._onChange);
    this.questionResultListener = QuestionResultStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.quizListener.remove();
    this.questionResultListener.remove();
  },
  _onChange: function() {
    var quiz = QuizStore.quiz();
    var questionResults = QuestionResultStore.all();

    this.setState({
      quiz: quiz,
      questionResults: questionResults
    });
  },
  renderQuiz: function () {
    if (!this.state.quizOpen){
      return "";
    } else {
      return (this.state.quiz.questions.map(function (question, idx) {
        return (
          <div key={idx}>
            <Question number={idx + 1} question={question}/>
          </div>
        )
      }));
    }
  },
  render: function () {
    return (
      <div>
        <div className="quiz-title">
          <h3>{this.state.quiz.title}</h3>
        </div>

        <div className={this.state.startButtonClass}>
          <img onClick={this.handleClick} src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsqoVToJaalEM8Uq1E-P5AolKGr5NmPx1tuzUs-Nw4CNL0K0Vf"/>
        </div>

        <div className="quiz">
          {this.renderQuiz()}
        </div>
      </div>
    )
  }
});

module.exports = Quiz;
