var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var QuestionResultStore = new Store(AppDispatcher);

var _questionResults = {};

var addQuestionResult = function(questionResult, questionId) {
  _questionResults[questionId] = questionResult;
};

QuestionResultStore.all = function() {
  return _questionResults;
};

QuestionResultStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "QUESTION_RESULT_RECIEVED":
      addQuestionResult(payload.questionResult, payload.questionId);
      QuestionResultStore.__emitChange();
      break;
  }
};

module.exports = QuestionResultStore;
