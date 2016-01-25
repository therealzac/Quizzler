Quiz.create!({
  title: "Ruby Quiz",
  day: "W1D1",
  max_time: 60,
  number_of_questions: 3
})

Question.create!({
  question_type: "true false",
  quiz_id: 1,
  text: "The first position of an array is 0",
  correct_answer_id: 1,
  explanation: "Indexing starts from 0"
})


Answer.create!({
  text: "True",
  question_id: 1
})

Answer.create!({
  text: "False",
  question_id: 1
})

Question.create!({
  question_type: "multiple choice",
  quiz_id: 1,
  text: "What is the right command to create an array?",
  correct_answer_id: 3,
  explanation: "Array.new is the proper way"
})

Answer.create!({
  text: "Array.new",
  question_id: 2
})

Answer.create!({
  text: "new Array",
  question_id: 2
})
Answer.create!({
  text: "Create Array",
  question_id: 2
})
Answer.create!({
  text: "Array.render",
  question_id: 2
})

Question.create!({
  question_type: "fill in the blank",
  quiz_id: 1,
  text: "The shortest way to create a hash is ____",
  correct_answer_id: 7,
  explanation: "That's how you make a hash"
  })

# Answer.create!({
#   text: "[]",
#   question_id: 3
# })
Answer.create!({
  text: "{}",
  question_id: 3
})
# Answer.create!({
#   text: "<>",
#   question_id: 3
# })
Answer.create!({
  text: "incorrect answer",
  question_id: 3
})
