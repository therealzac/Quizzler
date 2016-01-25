var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var UserQuizStore = new Store(AppDispatcher);
var QuizConstants = require('../constants/quizConstants.js');

var _userQuiz = {};

var addAttribute = function() {

};

var addUserQuiz = function(userQuiz) {
  _userQuiz["startTime"] =  Date.parse(userQuiz.created_at);
  _userQuiz["quizId"] = userQuiz.quiz_id;
};

UserQuizStore.all = function() {
  return _userQuiz;
};

UserQuizStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuizConstants.USER_QUIZ_RECIEVED:
      addUserQuiz(payload.userQuiz);
      UserQuizStore.__emitChange();
      break;
  }
};

module.exports = UserQuizStore;
