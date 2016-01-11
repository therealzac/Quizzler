var ApiActions = require('../apiActions/apiActions.js');

var ApiUtil = {
  fetchQuiz: function (id) {
    $.ajax({
      url: "quizzes/" + id,
      method: "GET",
      success: function (quiz) {
        ApiActions.recieveQuiz(quiz);
      },
      error: function (error) {
        console.log(error);
      }
    });
  },
  submitAnswer: function(answerParams, questionId, revealAnswerCallback) {
    $.ajax({
      url: "answer_choices",
      method: "POST",
      data: {
        answer_choice: answerParams,
        question_id: questionId
      },
      success: function(questionResult) {
        revealAnswerCallback(questionResult);
        ApiActions.receiveQuestionResult(questionResult);
      },
      error: function(error) {
        console.log(error.message);
      }
    })
  }
}

module.exports = ApiUtil;
