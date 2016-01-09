apiUtil = {
  fetchQuiz: function (id) {
    $.ajax({
      url: "quiz/" + id,
      method: "GET",
      success: function (quiz) {
        ApiActions.recieveQuiz(quiz);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}
