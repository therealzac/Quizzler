var React = require('react');
var QuizStore = require('../stores/quizStore');
var QuestionResultStore = require('../stores/questionResultStore');
var Question = require('./question.jsx');
var ApiUtil = require('../apiUtil/apiUtil.js');
var UserQuizStore = require('../stores/userQuizStore');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
window.QuizTour = require('./shepherd/quizTour.js');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      startButtonShowing: true,
      userQuiz: UserQuizStore.all(),
      quizOpen: false,
      quiz: QuizStore.quiz(),
      questionResults: {},
      questionsAnswered: 0
     };
  },
  handleClick: function () {
    this.setState({ startButtonShowing: false, quizOpen: true });
    ApiUtil.createUserQuiz(this.state.quiz.id);
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._quizChange);
    this.questionResultListener = QuestionResultStore.addListener(this._questionResultChange);
    this.userQuizListener = UserQuizStore.addListener(this._userQuizChange);
    ApiUtil.fetchUserQuiz(1);
    ApiUtil.fetchAllQuestionResults(1);
    window.QuizTour.start();
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
  incrementQuestionsAnswered: function () {
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 })
  },
  // renderQuiz: function () {
  //   var that = this;
  //
  //   if (Object.keys(this.state.userQuiz).length > 0) {
  //     return "";
  //   } else {
  //     return (this.state.quiz.questions.map(function (question, idx) {
  //       return (
  //         <div key={idx}>
  //           <Question number={idx + 1}
  //                     question={question}
  //                     questionsAnswered={that.state.questionsAnswered}
  //                     incrementQuestionsAnswered={that.incrementQuestionsAnswered}
  //                     id={"question" + idx}/>
  //         </div>
  //       )
  //     }));
  //   }
  // },
  render: function () {
    var that = this;
    var startButton;
    var quizBody;

    if (Object.keys(this.state.userQuiz).length === 0) {
      startButton = (
        <div key="start-button-wrapper">
          <div className="start-button"
               onClick={this.handleClick}>
            <span className="start-text">start</span>
            <span className="start-icon"><i className="fa fa-angle-double-right"></i></span>
          </div>
        </div>
      )
    } else {
      startButton = (<div></div>)
    };

    if (!this.state.quizOpen) {
      quizBody = (<div></div>)
    } else {
      quizBody = (
        <div key="quiz-body" className="quiz">
          {this.state.quiz.questions.map(function (question, idx) {
            return (
              <div key={idx}>
                <Question number={idx + 1}
                          question={question}
                          questionsAnswered={that.state.questionsAnswered}
                          incrementQuestionsAnswered={that.incrementQuestionsAnswered} />
              </div>
            )
          })}
        </div>
      );
    };

    return (
      <div className="background">
        <div className="quiz-body-wrapper">
          <div className="quiz-title">
            <h3>{this.state.quiz.title}</h3>
          </div>

          <ReactCSSTransitionGroup transitionName="start-button"
                                   transitionEnterTimeout={0}
                                   transitionLeaveTimeout={0}>
            { startButton }
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="quiz-body"
                                   transitionEnterTimeout={0}
                                   transitionLeaveTimeout={0}>
            { quizBody }
          </ReactCSSTransitionGroup>

        </div>
      </div>
    )
  }
});

module.exports = Quiz;
