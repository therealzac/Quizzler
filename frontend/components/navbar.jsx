var React = require('react');
var QuizStore = require('../stores/quizStore');
var ApiUtil = require('../apiUtil/apiUtil');
var Modal = require('react-modal');
var UserQuizStore = require('../stores/userQuizStore');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

var Navbar = React.createClass({
  getInitialState: function () {
    return {
      quiz: {},
      modalOpen: false,
      questionsAnswered: 0,
      questionsCorrect: 0,
      timeRemaining: null,
      userQuiz: null,
    };
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._quizChange);
    ApiUtil.fetchQuiz(1);
    this.userQuizListener = UserQuizStore.addListener(this._userQuizChange);
  },
  componentWillUnmount: function() {
    this.quizListener.remove();
    this.userQuizListener.remove();
  },
  _quizChange: function () {
    var that = this;

    this.setState({
      quiz: QuizStore.quiz(),
      questionsAnswered: QuizStore.questionsAnswered(),
      questionsCorrect: QuizStore.questionsCorrect()
    });

    if (QuizStore.questionsAnswered() === this.state.quiz.number_of_questions) {
      window.setTimeout(function () { that.setState({ modalOpen: true }) }, 1500);
    };

    ApiUtil.fetchUserQuiz(this.state.quiz.id);
  },
  _userQuizChange: function() {
    this.setState({userQuiz: UserQuizStore.all()});
    var timeElapsed = Math.floor((Date.now() - this.state.userQuiz.startTime) / 1000)
    this.setState({
      timeRemaining: this.state.quiz.max_time * 60 - timeElapsed
    })
    if (this.timerTicker === undefined) {
      this.timerTicker = window.setInterval(function() {
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
        })
      }.bind(this), 1000);
    }
  },
  renderModal: function () {
    var appElement = document.getElementById('root');
    Modal.setAppElement(appElement);

    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>

          <div className="modal">
            <h3>Quiz Completed!</h3>
            <p>You answered {this.state.questionsCorrect}/{this.state.questionsAnswered} correctly.<br/>
            Click "Ok" to review your answers.</p><br/>
            <button
              className="submit-button"
              onClick={this.closeModal}>
              Ok
            </button>
          </div>

        </Modal>
      </div>
    );
  },
  openModal: function() {
    this.setState({ modalOpen: true });
  },
  closeModal: function() {
    this.setState({ modalOpen: false });
  },
  render: function () {
    return (
      <div className="navbar">
        <div className="logo">App Academy Quizzler</div>
        <ul className="header-right">
          <li>{this.state.questionsAnswered}/{this.state.quiz.number_of_questions} Questions answered</li>
          <li>Time remaining: {this.state.timeRemaining}</li>
        </ul>

        <div className="modal">
          {this.renderModal()}
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
