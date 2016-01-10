var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuizConstants = require('../constants/quizConstants.js');

module.exports = {
  recieveQuiz: function (quiz) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.QUIZ_RECIEVED,
      quiz: quiz
    });
  },

  receiveQuestionResult: function(questionResult, questionId) {
    AppDispatcher.dispatch({
      actionType: "QUESTION_RESULT_RECIEVED",
      questioResult: questionResult,
      questionId: questionid
    });
  }
}
