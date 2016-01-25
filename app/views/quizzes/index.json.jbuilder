json.array!(@quizzes) do |quiz|
  json.id quiz.id
  json.title quiz.title
  json.day quiz.day
  json.max_time quiz.max_time
  json.number_of_questions quiz.number_of_questions

  json.questions quiz.questions do |question|
    json.id question.id
    json.question_type question.question_type
    json.text question.text

if question.question_type != "fill in the blank" 
  json.answers question.answers do |answer|
    json.id answer.id
    json.text answer.text
  end
end

  end
  # json.questions quiz.questions
  # json.answers quiz.answers
end
