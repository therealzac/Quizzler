var React = require('react');
var QuizStore = require('../stores/quizStore');
var QuestionResultStore = require('../stores/questionResultStore');
var Question = require('./question.jsx');
var ApiUtil = require('../apiUtil/apiUtil.js');
var UserQuizStore = require('../stores/userQuizStore');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      startButtonClass: "start-button",
      quizOpen: false,
      quiz: QuizStore.quiz(),
      questionResults: {},
      userQuiz: null
     };
  },
  handleClick: function () {
    this.setState({ startButtonClass: "hidden", quizOpen: true });
    ApiUtil.createUserQuiz(this.state.quiz.id);
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._quizChange);
    this.questionResultListener = QuestionResultStore.addListener(this._questionResultChange);
    this.userQuizListener = UserQuizStore.addListener(this._userQuizChange);
    ApiUtil.fetchUserQuiz(1);
    ApiUtil.fetchAllQuestionResults(1);
  },
  componentWillUnmount: function() {
    this.quizListener.remove();
    this.questionResultListener.remove();
  },
  _quizChange: function() {
    this.setState({
      quiz: QuizStore.quiz()
    })
  },
  _questionResultChange: function() {
    this.setState({
      questionResults: QuestionResultStore.all()
    })
  },
  _userQuizChange: function() {
    this.setState({
      userQuiz: UserQuizStore.all()
    })

    if (this.state.userQuiz.startTime) {
      this.setState({
        startButtonClass: "hidden",
        quizOpen: true
      })
    }
  },
  // _onChange: function() {
  //   var quiz = QuizStore.quiz();
  //   var questionResults = QuestionResultStore.all();
  //   var userQuiz = UserQuizStore.all();
  //
  //   this.setState({
  //     quiz: quiz,
  //     questionResults: questionResults,
  //     userQuiz: userQuiz
  //   });
  //
  //   if (userQuiz.startTime) {
  //     this.setState({
  //       startButtonClass: "hidden",
  //       quizOpen: true
  //     })
  //   }
  // },
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
