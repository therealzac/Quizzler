var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuizConstants = require('../constants/quizConstants.js');

module.exports = {
  recieveQuiz: function (quiz) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.QUIZ_RECIEVED,
      quiz: quiz
    });
  },

  receiveQuestionResult: function(questionResult) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.QUESTION_RESULT_RECIEVED,
      questionResult: questionResult
    });
  },

  receiveUserQuiz: function(userQuiz) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.USER_QUIZ_RECIEVED,
      userQuiz: userQuiz
    });
  },

  receiveAllQuestionResults: function(questionResults) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.ALL_QUESTION_RESULTS_RECIEVED,
      questionResults: questionResults
    });
  }
}
