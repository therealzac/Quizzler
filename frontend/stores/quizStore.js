var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuizStore = new Store(AppDispatcher);
var QuizConstants = require('../constants/quizConstants.js');

var _quiz = {};

var resetQuiz = function (quiz) {
  _quiz = quiz;
};

QuizStore.quiz = function () {
  return _quiz;
};

QuizStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuizConstants.QUIZ_RECIEVED:
      resetQuiz(payload.quiz);
      QuizStore.__emitChange();
      break;
  }
}


module.exports = QuizStore;
