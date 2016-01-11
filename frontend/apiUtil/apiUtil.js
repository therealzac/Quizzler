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
  submitAnswer: function(questionId, answerChoice) {
    $.ajax({
      url: "answer_choices",
      method: "POST",
      data: {
        question_id: questionId,
        answer_choice: answerChoice
      },
      success: function(questionResult) {
        ApiActions.receiveQuestionResult(questionResult, questionId);
      },
      error: function(error) {
        console.log(error.message);
      }
    })
  }
}

module.exports = ApiUtil;
