var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuestionResultStore = new Store(AppDispatcher);
var QuizConstants = require('../constants/quizConstants.js')

var _questionResults = {};

var addQuestionResult = function(questionResult, questionId) {
  _questionResults[questionId] = questionResult;
};

var populateQuestionResults = function(questionResults) {
  questionResults.forEach(function(questionResult) {
    _questionResults[questionResult.question_id] = questionResult;
  })
}

QuestionResultStore.all = function() {
  return _questionResults;
};

QuestionResultStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "QUESTION_RESULT_RECIEVED":
      addQuestionResult(payload.questionResult, payload.questionId);
      QuestionResultStore.__emitChange();
      break;
    case QuizConstants.ALL_QUESTION_RESULTS_RECIEVED:
      populateQuestionResults(payload.questionResults);
      QuestionResultStore.__emitChange();
  }
};

module.exports = QuestionResultStore;
