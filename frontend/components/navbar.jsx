var React = require('react');
var QuizStore = require('../stores/quizStore');
var ApiUtil = require('../apiUtil/apiUtil');

var Navbar = React.createClass({
  getInitialState: function () {
    return {
      quiz: {},
      questionsAnswered: 0
    };
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._onChange);
    ApiUtil.fetchQuiz(1);
  },
  _onChange: function () {
    this.setState({
      quiz: QuizStore.quiz(),
      questionsAnswered: QuizStore.questionsAnswered()
    })
  },
  render: function () {
    return (
      <div className="navbar">
        <ul>
          <li className="logo">App Academy Quizzler</li>
          <li className="quiz-name">Ruby quiz</li>
          <li className="header-right">{this.state.questionsAnswered}/{this.state.quiz.number_of_questions} questions answered</li>
          <li className="header-right">Time remaining: {this.state.quiz.max_time}</li>
        </ul>
      </div>
    )
  }
});

module.exports = Navbar;
