
# json.extract!(
#   @quiz,
#   :title, :day, :max_time, :number_of_questions, :questions, :answers
# )

# json.extract! @quiz, :id, :title, :day, :max_time, :number_of_questions, :questions, :answers

json.id @quiz.id
json.title @quiz.title
json.day @quiz.day
json.max_time @quiz.max_time
json.number_of_questions @quiz.number_of_questions

json.questions @quiz.questions do |question|
  json.id question.id
  json.question_type question.question_type
  json.quiz_id question.quiz_id
  json.text question.text
  json.explanation question.explanation

  json.answers question.answers do |answer|
    json.id answer.id
    json.text answer.text
    json.question_id answer.question_id
  end

end
