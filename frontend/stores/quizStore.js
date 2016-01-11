var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuizStore = new Store(AppDispatcher);
var QuizConstants = require('../constants/quizConstants.js');

var _quiz = {};
var _questionsAnswered = 0;

var resetQuiz = function (quiz) {
  _quiz = quiz;
};

var incrementQuestionsAnswered = function () {
  _questionsAnswered += 1;
};

QuizStore.quiz = function () {
  return _quiz;
};

QuizStore.questionsAnswered = function () {
  return _questionsAnswered;
};

QuizStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuizConstants.QUIZ_RECIEVED:
      resetQuiz(payload.quiz);
      QuizStore.__emitChange();
      break;
    case QuizConstants.QUESTION_RESULT_RECIEVED:
      incrementQuestionsAnswered();
      QuizStore.__emitChange();
      break;
  }
}

module.exports = QuizStore;
