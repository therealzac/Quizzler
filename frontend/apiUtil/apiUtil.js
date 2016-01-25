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
        console.log(error);
      }
    })
  },

  createUserQuiz: function(quizId) {
    $.ajax({
      url: "user_quizzes",
      method: "POST",
      data: {quiz_id: quizId},
      success: function(userQuiz) {
        ApiActions.receiveUserQuiz(userQuiz);
      },
      error: function(error) {
        console.log(error);
      }
    })
  },

  fetchUserQuiz: function(quizId) {
    $.ajax({
      url: "user_quizzes",
      method: "GET",
      data: {quiz_id: quizId},
      success: function(userQuiz) {
        if (userQuiz) {
          ApiActions.receiveUserQuiz(userQuiz);
        }
      },
      error: function(error) {
        console.log(error);
      }
    })
  },

  fetchAllQuestionResults: function(quizId) {
    $.ajax({
      url: "answer_choices",
      method: "GET",
      data: {quiz_id: quizId},
      success: function(questionResults) {
        ApiActions.receiveAllQuestionResults(questionResults);
      },
      error: function(error) {
        console.log(error);
      }
    })
  }
}

module.exports = ApiUtil;
