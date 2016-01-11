var React = require('react');
var QuizStore = require('../stores/quizStore');
var QuestionResultStore = require('../stores/questionResultStore');
var Question = require('./question.jsx');
var Modal = require('./modal.jsx');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      startButtonClass: "start-button",
      quizOpen: false,
      modalOpen: false,
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
          <div>
            <span>{idx + 1}. </span>
            <Question key={idx} question={question}/>
          </div>
        )
      }));
    }
  },
  renderModal: function () {
    if (!this.state.modalOpen){
      return "";
    } else {
      return (
        <Modal
          questionResults={this.state.questionResults}
          closeModal={this.closeModal}/>
      );
    }
  },
  closeModal: function() {
    this.setState({
      modalOpen: false
    })
  },
  render: function () {
    return (
      <div>
        <div className={this.state.startButtonClass}>
          <img onClick={this.handleClick} src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsqoVToJaalEM8Uq1E-P5AolKGr5NmPx1tuzUs-Nw4CNL0K0Vf"/>
        </div>

        <div className="quiz">
          {this.renderQuiz()}
        </div>

        <div className="modal">
          {this.renderModal()}
        </div>
      </div>
    )
  }
});

module.exports = Quiz;
