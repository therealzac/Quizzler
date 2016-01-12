var React = require('react');
var QuizStore = require('../stores/quizStore');
var ApiUtil = require('../apiUtil/apiUtil');
var Modal = require('react-modal');

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
      questionsCorrect: 0
    };
  },
  componentDidMount: function() {
    this.quizListener = QuizStore.addListener(this._onChange);
    ApiUtil.fetchQuiz(1);
  },
  _onChange: function () {
    var that = this;

    this.setState({
      quiz: QuizStore.quiz(),
      questionsAnswered: QuizStore.questionsAnswered(),
      questionsCorrect: QuizStore.questionsCorrect()
    });

    if (QuizStore.questionsAnswered() === this.state.quiz.number_of_questions) {
      window.setTimeout(function () { that.setState({ modalOpen: true }) }, 1500);
    };
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
          <li>Time remaining: {this.state.quiz.max_time}</li>
        </ul>

        <div className="modal">
          {this.renderModal()}
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
